from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


class UserRecord(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str = Field(unique=True)
    hashed_password: str
    is_active: bool
    role: UserRole = Field(default=UserRole.USER)

