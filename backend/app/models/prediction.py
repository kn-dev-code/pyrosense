from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class PredictionRecord(SQLModel, table=True):
    coordinate_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="userrecord.id")
    west_lon: float = Field(ge=-180, le=180)
    south_lat: float = Field(ge=-90, le=90)
    east_lon: float = Field(ge=-180, le=180)
    north_lat: float = Field(ge=-90, le=90)