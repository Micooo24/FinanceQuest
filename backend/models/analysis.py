from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class FinancialAnalysis(BaseModel):
    user_id: str
    year: int
    month: int
    analysis: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))