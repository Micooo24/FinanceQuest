from pydantic import BaseModel, Field, ConfigDict
from enum import Enum
from bson import ObjectId
from typing import Optional

class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    
class Character(BaseModel):
    gender: Gender
    description: str
    user_id: Optional[ObjectId] = None

    class Config:
        arbitrary_types_allowed = True
        