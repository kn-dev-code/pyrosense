from fastapi import status, HTTPException
from sqlmodel import Session, select, desc
from app.controllers.fire_controller import _verify_active_user
from app.schemas.intelligence_schema import CoordinateRequest
from typing import Optional
from app.api.nasa_api import base_url, nasa_api
import httpx
import json
import csv
import io
import joblib
from joblib import Memory
import pandas as pd
from dotenv import load_dotenv
from app.models.prediction import PredictionRecord
from app.models.user import UserRecord
from app.api.nasa_api import nasa_api
load_dotenv()
cachedir = './wildfire_model_cache'
memory = Memory(cachedir, verbose=0)

try:
    model = joblib.load('best_xgb.pkl')
except Exception as e:
    print(f"Production Warning: Model file not found: {e}")
    model = None

# Helper function placed cleanly outside the cached inference block
def assign_risk_level(frp_value):
    if frp_value < 5.0:
        return 0
    elif frp_value < 15.0:
        return 1
    elif frp_value < 40.0:
        return 2
    else:
        return 3

@memory.cache
def run_cached_inference(features_json: str):
    if model is None:
        return [], []
        
    raw_df = pd.read_json(features_json)
    raw_df['risk_level'] = raw_df['frp'].apply(assign_risk_level)
    raw_df['is_daytime'] = raw_df['daynight'].map({'D': 1, 'N': 0})
    raw_df['pixel_area'] = raw_df['scan'] * raw_df['track']
    raw_df['frp_density'] = raw_df['frp'] / raw_df['pixel_area']
    raw_df['thermal_diff'] = raw_df['bright_ti4'] - raw_df['bright_ti5']
    raw_df['thermal_ratio'] = raw_df['bright_ti4'] / raw_df['bright_ti5']
    
    raw_df['is_daytime'] = raw_df['is_daytime'].fillna(0).astype(int)
    if raw_df['confidence'].dtype == 'O':
        raw_df['confidence_num'] = raw_df['confidence'].map({'low': 0, 'nominal': 1, 'high': 2})
    else:
        raw_df['confidence_num'] = raw_df['confidence']
        
    raw_df['confidence_num'] = pd.to_numeric(raw_df['confidence_num'], errors='coerce').fillna(0).astype(float)

    feature_list = [
        'latitude', 'longitude', 'pixel_area', 'thermal_diff', 'thermal_ratio', 'confidence_num', 'is_daytime'
    ]
    X_inference = raw_df[feature_list]
    
    predictions = model.predict(X_inference)
    probabilities = model.predict_proba(X_inference)
    
    return predictions.tolist(), probabilities.tolist()


async def query_intelligence_controller(user_id: int, prediction_request: CoordinateRequest, db: Session):
    _verify_active_user(user_id, db)
    west_lon = prediction_request.west_longitude
    south_lat = prediction_request.south_latitude
    east_lon = prediction_request.east_longitude
    north_lat = prediction_request.north_latitude
    source = "VIIRS_NOAA20_NRT"
    day_range = 1

    prediction_url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{nasa_api}/{source}/{west_lon},{south_lat},{east_lon},{north_lat}/{day_range}"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(prediction_url)
            response.raise_for_status() 
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="NASA FIRMS service unreachable.")

    csv_data = response.text
    csv_file = io.StringIO(csv_data)
    reader = csv.DictReader(csv_file)
    raw_hotspots = list(reader)
    if not raw_hotspots:
        return {"status": "success", "hotspots_found": 0, "data": []}
        
    # Ready for you to pass raw_hotspots into your cached inference function here...
    coordinates = json.dumps(raw_hotspots)
    preds, probs = run_cached_inference(coordinates)
    db_coordinate_data = PredictionRecord(
        user_id = user_id,
        west_lon = prediction_request.west_longitude,
        south_lat = prediction_request.south_latitude,
        east_lon = prediction_request.east_longitude,
        north_lat = prediction_request.north_latitude
    )
    db.add(db_coordinate_data)
    db.commit()
    db.refresh(db_coordinate_data)
    return {"status": "success", "hotspots_found": len(raw_hotspots), "data": {"predictions": preds, "probabilities": probs}}
def get_coordinate_data_controller(user_id: int, db: Session, prediction_id: Optional[int] = None):
    _verify_active_user(user_id, db)
    
    if prediction_id is not None:
        find_coordinate_data = select(PredictionRecord).where(
            PredictionRecord.user_id == user_id, 
            PredictionRecord.coordinate_id == prediction_id
        )
    else:
        find_coordinate_data = select(PredictionRecord).where(
            PredictionRecord.user_id == user_id
        ).order_by(desc(PredictionRecord.coordinate_id)) 

    result = db.exec(find_coordinate_data).first()

    if not result:
        raise HTTPException(status_code=404, detail="Prediction record not found")
    
    return {"status": "success", "message": "Prediction record retrieved successfully!", "data": result}