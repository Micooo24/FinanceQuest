from pydantic import BaseModel, Field
from typing import List
from datetime import datetime, timezone

class Answer(BaseModel):
    question: str
    selected_index: int
    is_correct: bool
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserAnswers(BaseModel):
    user_id: str
    answers: List[Answer]
