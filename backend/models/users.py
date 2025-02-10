from pydantic import BaseModel, Field
from datetime import date, datetime, timezone
from bson import ObjectId
from typing import Optional
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    user = "user"

class User(BaseModel):
    username: str
    email: str
    password: str
    birthday: date = None
    img_path: str = None
    # disabled: bool = None
    role: Role = Role.user
    character_id: Optional[ObjectId] = None  # Add this line to include character_id
    firebaseuid: Optional[str] = None  # Add this line to include firebaseuid
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))  # Add created_at field
    verified: bool = False  # Add verified field


    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId