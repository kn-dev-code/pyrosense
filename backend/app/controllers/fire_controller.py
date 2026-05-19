from fastapi import Response, HTTPException, status
from sqlmodel import Session, select
from app.models.user import UserRecord
from app.core.database import get_session


def report_fire_controller(user_id: int, db: get_session, ):

  user = db.exec(select(UserRecord).where(UserRecord.id == user_id)).first()

  if not user:
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
  

  if not user.is_active:
    raise HTTPException(status_code = status.HTTP_403_FORBIDDEN)
  


  