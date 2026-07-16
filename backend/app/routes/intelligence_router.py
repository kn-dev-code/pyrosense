from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session
from app.schemas.intelligence_schema import CoordinateResponse, CoordinateRequest
from app.controllers.intelligence_controller import get_coordinate_data_controller, query_intelligence_controller
from app.core.database import get_db
from app.core.security import get_current_user_from_cookie
from typing import Optional

intelligence_router = APIRouter()


@intelligence_router.post("/create_prediction")
async def create_wildfire_prediction(prediction_request: CoordinateRequest, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user_from_cookie)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id:
        raise HTTPException(
         status_code=401, detail = "User identifier not found in session token"
        )
    return await query_intelligence_controller(
        user_id = int(user_id),
        prediction_request = prediction_request,
        db=db
    )
    
@intelligence_router.get(
    "/get_predictions",
    status_code=status.HTTP_200_OK,
    # response_model=CoordinateResponse # Keep your response model if defined
)
def get_wildfire_prediction(
    prediction_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_from_cookie)
):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="User identifier not found in session token")

    return get_coordinate_data_controller(
        user_id=int(user_id),
        prediction_id=prediction_id,
        db=db
    )