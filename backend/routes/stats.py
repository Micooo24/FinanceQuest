from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Request, Depends   
from fastapi.responses import JSONResponse

# MongoDB 
from config.db import db  
# from utils.utils import SECRET_KEY
from utils.utils import get_current_user 

# Pydantic
from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

router = APIRouter()

class Coordinates(BaseModel):
    x: float
    y: float
    z: float

class Stats(BaseModel):
    health: int = 100
    level: int = 1
    money: int = 5000
    experience: int = 0
    location: Coordinates = Coordinates(x=0.0, y=0.0, z=0.0)

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId

class GrocerySelectionRequest(BaseModel):
    total_spent: int

@router.get("/get/player", response_model=Stats)
async def read_current_user_stats(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    stats["_id"] = str(stats["_id"])
    return stats    

@router.post("/store/player", response_model=Stats)
async def initialize_stats(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if existing_stats:
        raise HTTPException(status_code=400, detail="Stats already exist for the current user")
    
    new_stats = Stats()
    stats_dict = new_stats.dict()
    stats_dict["user_id"] = ObjectId(user_id)
    db["stats"].insert_one(stats_dict)
    return stats_dict

#pay rent
@router.put("/decision/subtract_money")
async def subtract_money(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    new_money = stats["money"] - 2500
    if new_money < 0:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": {"money": new_money}})
    return {"message": "Money subtracted successfully", "new_balance": new_money}

# Grocery selection
@router.put("/decision/grocery_selection")
async def grocery_selection(request: GrocerySelectionRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    new_money = stats["money"] - request.total_spent
    if new_money < 0:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    
    db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": {"money": new_money}})
    return {"message": "Grocery selection processed successfully", "new_balance": new_money}