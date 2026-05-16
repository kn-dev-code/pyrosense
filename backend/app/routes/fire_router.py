from fastapi import APIRouter

fire_router = APIRouter()

@fire_router.get("")
def get_fires():
    return {"message": "List of fires"}

@fire_router.get("/{fire_id}")
def get_fire_by_id(fire_id: int):
    return {"message": f"Details of fire with ID: {fire_id}"}

@fire_router.post("")
def create_fire():
    return {"message": "Create a new fire record"}

@fire_router.patch("/{fire_id}/status")
def update_fire_status(fire_id: int):
    return {"message": f"Update status of fire with ID: {fire_id}"}