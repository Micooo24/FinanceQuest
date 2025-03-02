from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class minibudget(BaseModel):
    user_id: str
    balance: float
    firstweek: float
    secondweek: float
    thirdweek: float
    fourthweek: float
    average: float
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))