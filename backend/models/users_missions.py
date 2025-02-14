from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

class MissionStatus(str, Enum):
    complete = "completed"
    not_complete = "not_completed"

class UserMission(BaseModel):
    user_id: str  # Reference to the User
    mission_id: str  # Reference to the Mission
    status: MissionStatus = MissionStatus.not_complete
    # progress: int = 0  # Percentage (e.g., 0% → 100%)
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    completed_at: Optional[datetime] = None

    class Config:
        arbitrary_types_allowed = True
