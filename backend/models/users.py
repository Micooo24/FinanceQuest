from pydantic import BaseModel, Field
from datetime import date, datetime, timezone
from bson import ObjectId
from typing import Optional, List
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    user = "user"

class User(BaseModel):
    username: str
    email: str
    password: str
    birthday: Optional[date] = None
    img_path: Optional[str] = None
    role: Role = Role.user
    character_id: Optional[ObjectId] = None
    firebaseuid: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    verified: bool = False
    missions: List[str] = []  # List of mission IDs assigned to the user

    class Config:
        arbitrary_types_allowed = True
