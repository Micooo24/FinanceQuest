# FinanceQuest/backend/routes/ai_analysis.py
from fastapi import APIRouter, HTTPException, Depends
from models.miniInvesting import UserAnswers
from config.db import db
from bson import ObjectId
from typing import Optional, List,  Dict

router = APIRouter()

@router.post("/save-answers")
async def save_answers(user_answers: UserAnswers):
    try:
        answers_collection = db["miniInvesting"]
        answers_collection.insert_one(user_answers.dict())  # Save the entire payload as a single document
        return {"message": "Answers saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))