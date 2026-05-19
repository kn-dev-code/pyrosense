from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class FireCreate(BaseModel):
  latitude: float = Field(...)
  longitude: float = Field(...)
  fire_power: float = Field(...)
  acquired_date: datetime = Field(...)
  confidence: bool = Field(...)


class FireUpdate(BaseModel):
  latitude: Optional[float] = Field(None)
  longitude: Optional[float] = Field(None)
  fire_power: Optional[float] = Field(None)
  acquired_date: Optional[datetime] = Field(None)
  confidence: Optional[bool] = Field(None)

