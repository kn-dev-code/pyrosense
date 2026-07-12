from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class PredictionRecord(SQLModel, table=True):
    west_lon = float
    south_lat = float
    east_lon = float
    north_lat = float


class PredictionRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    latitude: float
    longitude: float
    risk_level: float
    confidence_breakdown: str
    generated_at: datetime