from pydantic import BaseModel
from typing import Optional
from enum import Enum

class Reward(BaseModel):
    amt_money: int
    amt_exp: int

# class MissionStatus(str, Enum):
#     not_completed = "not_completed"
#     completed = "completed"
   

class Mission(BaseModel):
    title: str 
    description: str
    task_type: str 
    objective: str 
    reward: Reward
    required_level: int
    # status: MissionStatus = MissionStatus.not_completed  # Default status is "active"

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
