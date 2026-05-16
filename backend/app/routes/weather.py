from fastapi import APIRouter

weather_router = APIRouter()

@weather_router.get("/current")
def get_current_weather():
    return {"message": "Current weather data"}

@weather_router.post("/log")
def log_weather():
    return {"message": "Weather forecast data"}