from fastapi import HTTPException
from config.db import db
from models.minibudget import minibudget
from typing import Dict, Optional
from bson import ObjectId

collection = db["minibudget"]

def save_minibudget(minibudget: minibudget):
    try:
        collection.insert_one(minibudget.dict())
        return {"message": "Game completion data saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_minibudget(user_id: str) -> Optional[Dict]:
    try:
        minibudget_data = collection.find_one({"user_id": user_id}, sort=[("started_at", -1)])
        if minibudget_data:
            minibudget_data["_id"] = str(minibudget_data["_id"])  
            return minibudget_data
        else:
            return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_minibudget(user_id: str, minibudget_data: minibudget):
    try:
        result = collection.update_one({"user_id": user_id}, {"$set": minibudget_data.dict()})
        if result.matched_count:
            return {"message": "Minibudget updated successfully"}
        else:
            return {"error": "Minibudget not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))