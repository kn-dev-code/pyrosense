from fastapi import status, HTTPException
from sqlmodel import Session, select
from app.models.weather import WeatherRecord
from app.schemas.weather_schema import WeatherCreate, WeatherQuery


