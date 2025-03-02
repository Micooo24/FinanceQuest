from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class minibudget_analysis(BaseModel):
    user_id: str
    analysis: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))