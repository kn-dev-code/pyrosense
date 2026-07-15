from pydantic import BaseModel
from enum import Enum
from datetime import date


class CoordinateRequest(BaseModel):
  west_longitude: float
  south_latitude: float
  east_longitude: float
  north_latitude: float


class CoordinateResponse(BaseModel):
  latitude: float
  longitude: float
  risk_level: str = Enum("Low", "Moderate", "High", "Extreme")
  confidence_breakdown: str
  prediction_date: date