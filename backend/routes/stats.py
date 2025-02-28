from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse

# MongoDB 
from config.db import db  
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
    points: int = 0
    location: Coordinates = Coordinates(x=0.0, y=0.0, z=0.0)
    q1_decision: Optional[str] = None
    q1_done: bool = False
    sq1_done: bool = False

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId

class GrocerySelectionRequest(BaseModel):
    total_spent: int

class Q1DecisionRequest(BaseModel):
    decision: str
    
class MedalPurchaseRequest(BaseModel):
    medal: str

medals = {
    "bronze_planner": 20,
    "silver_analyst": 25,
    "gold_strategist": 30,
    "platinum_investor": 40,
    "diamond_visionary": 50
}


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
    
    if request.total_spent <= 2000:
        new_points = stats["points"] + 10
        rewards = [
            "Maintains financial stability",
            "Earns +10 Smart Decision Points",
            "Saves money for future needs"
        ]
        consequences = [
            "Fewer grocery items purchased",
            "Limited access to premium or extra goods"
        ]
    else:
        new_points = stats["points"] + 8
        rewards = [
            "More groceries stocked",
            "Access to higher-quality or premium items",
            "Possible discounts or promotions"
        ]
        consequences = [
            "Less cash on hand for other expenses",
            "Increased risk of financial instability",
            "Potential debt if using credit"
        ]
    
    sq1_outcome = {
        "rewards": rewards,
        "consequences": consequences
    }
    
    db["stats"].update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {
            "money": new_money,
            "points": new_points,
            "sq1_done": True,
            "sq1_outcome": sq1_outcome
        }}
    )
    return {
        "message": "Grocery selection processed successfully",
        "new_balance": new_money,
        "new_points": new_points,
        "sq1_outcome": sq1_outcome
    }

# Combined endpoint for Q1 decision and subtract money
@router.put("/decision/q1")
async def q1_decision(request: Q1DecisionRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    if request.decision not in ["pay", "delay"]:
        raise HTTPException(status_code=400, detail="Invalid decision. Must be 'pay' or 'delay'.")

    update_fields = {
        "q1_decision": request.decision,
        "q1_done": True,
        "sq1_done": False
    }       

    if request.decision == "pay":
        # Reward for paying rent
        new_money = stats["money"] - 2500
        if new_money < 0:
            raise HTTPException(status_code=400, detail="Insufficient funds to pay rent")
        update_fields["money"] = new_money
        update_fields["points"] = stats["points"] + 10
        rewards = [
            "Ensures financial stability.",
            "Maintains a good relationship with the landlord.",
            "Peace of mind."
        ]
        consequences = [
            "Reduces cash on hand.",
            "Limits flexibility in spending for other business needs."
        ]
    elif request.decision == "delay":
        # Consequence for delaying rent
        new_money = stats["money"] - 500  # Late fee
        if new_money < 0:
            raise HTTPException(status_code=400, detail="Insufficient funds to delay rent")
        update_fields["money"] = new_money
        update_fields["points"] = stats["points"] + 5
        rewards = [
            "Keeps extra cash on hand for other expenses",
            "Allows investment in inventory or business growth before paying rent."
        ]
        consequences = [
            "Risk of late fees.",
            "Landlord’s trust may decrease.",
            "Possible stress or uncertainty about meeting the deadline."
        ]
        
    q1_outcome = {
        "rewards": rewards,
        "consequences": consequences
    }
    update_fields["q1_outcome"] = q1_outcome

    db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": update_fields})
    updated_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    updated_stats["_id"] = str(updated_stats["_id"])

    return {
        "message": "Q1 decision processed successfully",
        "updatedStats": {**updated_stats, "user_id": str(updated_stats["user_id"])},
        "q1_outcome": q1_outcome
    }
    
@router.put("/purchase/medal")
async def purchase_medal(request: MedalPurchaseRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    medal_cost = medals.get(request.medal)
    if medal_cost is None:
        raise HTTPException(status_code=400, detail="Invalid medal type")
    
    if stats["points"] < medal_cost:
        raise HTTPException(status_code=400, detail="Insufficient points to purchase this medal")
    
    new_points = stats["points"] - medal_cost
    medals_owned = stats.get("medals", [])
    medals_owned.append(request.medal)
    
    db["stats"].update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {
            "points": new_points,
            "medals": medals_owned
        }}
    )
    
    return {
        "message": f"{request.medal.replace('_', ' ').title()} purchased successfully",
        "new_points": new_points,
        "medals": medals_owned
    }