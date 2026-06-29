from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
  username: str = Field(..., min_length=3, max_length =20)
  email: EmailStr
  password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
  email: EmailStr
  password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
  username: Optional[str] = Field(None, min_length=3, max_length=20)
  email: Optional[EmailStr] = None
  password: Optional[str] = Field(default=None , min_length=8)


class GoogleAuthRequest(BaseModel):
  token_str: str


class TokenBody(BaseModel):
  username: Optional[str] = Field(None)
  email: Optional[EmailStr] = None
  role: str = "user"