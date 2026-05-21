from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class WeatherQuery(BaseModel):
  latitude: float = Field(...)
  longitude: float = Field(...)


class WeatherCreate(BaseModel):
  location_name: str = Field(..., min_length = 5)
  temperature: float = Field(...)
  humidity: float = Field(...)
  wind_speed: Optional[float] = Field(None)
  vpd: Optional[float] = Field(None)
  timestamp: datetime