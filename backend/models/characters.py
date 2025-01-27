from pydantic import BaseModel, Field, ConfigDict
from enum import Enum
from bson import ObjectId
from typing import Optional

class CharacterType(Enum):
    STUDENT = "student"
    ENTREPRENEUR = "entrepreneur"
    SINGLE_PARENT = "single_parent"
    EMPLOYEE = "employee"

class Character(BaseModel):
    type: CharacterType
    description: str
    user_id: Optional[ObjectId] = None

    class Config:
        arbitrary_types_allowed = True