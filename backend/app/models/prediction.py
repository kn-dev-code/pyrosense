from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class PredictionRecord(SQLModel, table=True):
    west_lon = float = Field(ge=-180, le=180)
    south_lat = float = Field(ge=-90, le=90)
    east_lon = float = Field(ge=-180, le=180)
    north_lat = float = Field(ge=-90, le=90)


class PredictionRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    latitude: float
    longitude: float
    risk_level: float
    confidence_breakdown: str
    generated_at: datetime