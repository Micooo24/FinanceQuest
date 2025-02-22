from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone


class Bill(BaseModel):
    category: str
    expected: int
    actual: int
    done: bool

class Expense(BaseModel):
    category: str
    expected: int
    actual: int
    due: str  
    done: bool

class Income(BaseModel):
    category: str
    expected: int
    actual: int
    done: bool
    
class Savings(BaseModel):
    category: str
    expected: int
    actual: int
    done: bool

# class MonthlyTracker(BaseModel):
#     year: int
#     month: int
#     # user_id: str
#     bills: Optional[list[Bill]] = []
#     expenses: Optional[list[Expense]] = []
#     income: Optional[list[Income]] = []
#     savings: Optional[list[Savings]] = []
#     started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MonthlyTracker(BaseModel):
    user_id: Optional[str] = None
    year: Optional[int] = None  
    month: Optional[int] = None
    bills: list[Bill] = []  
    expenses: list[Expense] = []
    income: list[Income] = []
    savings: list[Savings] = []
    started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# class MonthlyTracker(BaseModel):
#     year: Optional[int] = None  
#     month: Optional[int] = None
#     bills: list[Bill] = []  
#     expenses: list[Expense] = []
#     income: list[Income] = []
#     savings: list[Savings] = []
#     started_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))