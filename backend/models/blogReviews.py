from pydantic import BaseModel, Field
from datetime import datetime, timezone
from bson import ObjectId
from typing import Optional, List
from enum import Enum

class Reply(BaseModel):
    user_id: Optional[ObjectId] = None  
    reply_text: str  # The reply text
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))  
    anonymous: bool = False  # Whether the reply is anonymous
    username: Optional[str] = None  # The username for non-anonymous replies

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str  # Ensure ObjectId is converted to a string when serialized
        }


class BlogReview(BaseModel):
    blog_id: str  # Reference to the blog post being reviewed
    comment: Optional[str] = None  #
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))  
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc)) 
    anonymous: bool = False  # Whether the review is anonymous
    like_count: int = 0  
    replies: List[Reply] = []  # Array of replies to the review
    
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str  # Ensure ObjectId is converted to a string when serialized
        }