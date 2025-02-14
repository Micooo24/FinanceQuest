from pydantic import BaseModel, Field
from datetime import date, datetime, timezone
from bson import ObjectId
from typing import Optional
from enum import Enum

class Coordinates(BaseModel):
    x: float
    y: float
    z: float

class Stats(BaseModel):
    health: int = 100
    level: int = 1
    money: int = 5000
    experience: int = 0
    location: Coordinates = Coordinates(x=0.0, y=0.0, z=0.0)
    

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId

