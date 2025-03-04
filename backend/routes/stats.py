from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List

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
    q1_outcome: Optional[dict] = None
    sq1_done: bool = False
    sq1_outcome: Optional[dict] = None
    q2_decision: Optional[str] = None
    q2_done: bool = False
    q2_outcome: Optional[dict] = None
    sq2_decision: Optional[str] = None
    sq2_done: bool = False
    sq2_outcome: Optional[dict] = None
    q3_decision: Optional[str] = None
    q3_done: bool = False
    q3_outcome: Optional[dict] = None
    medals: List[str] = []

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId

class GrocerySelectionRequest(BaseModel):
    total_spent: int

class Q1DecisionRequest(BaseModel):
    decision: str

class Q2DecisionRequest(BaseModel):
    decision: str
    deposit: int
    
class Q3DecisionRequest(BaseModel):
    decision: str

class SQ2DecisionRequest(BaseModel):
    decision: str
    
class MedalPurchaseRequest(BaseModel):
    medal: str

# class LeaderboardEntry(BaseModel):
#     user_id: str
#     medals: List[str]
#     money: int

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
    stats["user_id"] = str(stats["user_id"])
    return stats

# @router.post("/store/player", response_model=Stats)
# async def initialize_stats(current_user: dict = Depends(get_current_user)):
#     user_id = current_user["_id"]
#     existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
#     if existing_stats:
#         raise HTTPException(status_code=400, detail="Stats already exist for the current user")
    
#     new_stats = Stats()
#     stats_dict = new_stats.dict()
#     stats_dict["user_id"] = ObjectId(user_id)
#     db["stats"].insert_one(stats_dict)
#     return stats_dict


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
        points_earned = 10
        update_fields["points"] = stats["points"] + points_earned
        rewards = [
            "Ensures financial stability.",
            "Maintains a good relationship with the landlord.",
            "Peace of mind."
        ]
        consequences = [
            "Reduces cash on hand.",
            "Limits flexibility in spending for other business needs."
        ]
        chosen_money = 2500
    elif request.decision == "delay":
        # Consequence for delaying rent
        new_money = stats["money"] - 500  # Late fee
        if new_money < 0:
            raise HTTPException(status_code=400, detail="Insufficient funds to delay rent")
        update_fields["money"] = new_money
        points_earned = 5
        update_fields["points"] = stats["points"] + points_earned
        rewards = [
            "Keeps extra cash on hand for other expenses",
            "Allows investment in inventory or business growth before paying rent."
        ]
        consequences = [
            "Risk of late fees.",
            "Landlord’s trust may decrease.",
            "Possible stress or uncertainty about meeting the deadline."
        ]
        chosen_money = 500
        
    q1_outcome = {
        "rewards": rewards,
        "consequences": consequences,
        "money": chosen_money,
        "points_earned": points_earned
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
        points_earned = 10
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
        points_earned = 8
    
    sq1_outcome = {
        "rewards": rewards,
        "consequences": consequences,
        "money": request.total_spent,
        "points_earned": points_earned
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

@router.put("/decision/q2")
async def q2_decision(request: Q2DecisionRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    if request.decision not in ["online_banking", "atm_card"]:
        raise HTTPException(status_code=400, detail="Invalid decision. Must be 'online_banking' or 'atm_card'.")

    new_money = stats["money"] - request.deposit
    if new_money < 0:
        raise HTTPException(status_code=400, detail="Insufficient funds to make the deposit")

    update_fields = {
        "q2_decision": request.decision,
        "q2_done": True,
        "money": new_money,
        "points": stats["points"] + 10
    }

    if request.decision == "online_banking":
        points_earned = 15
        update_fields["points"] += 5
        rewards = [
            "Easy access",
            "Fast transactions",
            "+5 points",
            "Security perks"
        ]
        consequences = [
            "Hacking risk",
            "Fees",
            "Needs internet"
        ]
    elif request.decision == "atm_card":
        points_earned = 12
        update_fields["points"] += 2
        rewards = [
            "Quick cash",
            "Store payments",
            "+2 points"
        ]
        consequences = [
            "Loss risk",
            "Withdrawal fees",
            "Limits"
        ]

    q2_outcome = {
        "rewards": rewards,
        "consequences": consequences,
        "money": request.deposit,
        "points_earned": points_earned
    }
    update_fields["q2_outcome"] = q2_outcome

    db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": update_fields})
    updated_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    updated_stats["_id"] = str(updated_stats["_id"])

    return {
        "message": "Q2 decision processed successfully",
        "updatedStats": {**updated_stats, "user_id": str(updated_stats["user_id"])},
        "q2_outcome": q2_outcome
    }

@router.put("/decision/sq2")
async def sq2_decision(request: SQ2DecisionRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    if stats is None:
        raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
    if request.decision not in ["deposit", "withdraw"]:
        raise HTTPException(status_code=400, detail="Invalid decision. Must be 'deposit' or 'withdraw'.")

    update_fields = {
        "sq2_decision": request.decision,
        "sq2_done": True
    }

    if request.decision == "deposit":
        points_earned = 15
        update_fields["points"] = stats["points"] + points_earned
        rewards = [
            "Builds financial discipline",
            "Ensures money is safe & accessible",
            "Helps with future planning"
        ]
        consequences = []
        chosen_money = 0
    elif request.decision == "withdraw":
        if "q2_outcome" not in stats or "money" not in stats["q2_outcome"]:
            raise HTTPException(status_code=400, detail="No deposit amount found from Q2 decision")
        
        deposit_amount = stats["q2_outcome"]["money"]
        new_money = stats["money"] + deposit_amount
        points_earned = -5
        update_fields["money"] = new_money
        update_fields["points"] = stats["points"] + points_earned
        rewards = [
            "Enjoyment from the purchase"
        ]
        consequences = [
            "No savings started",
            "Less money for future needs",
            "Increased risk of bad spending habits"
        ]
        chosen_money = deposit_amount

    sq2_outcome = {
        "rewards": rewards,
        "consequences": consequences,
        "money": chosen_money,
        "points_earned": points_earned
    }
    update_fields["sq2_outcome"] = sq2_outcome

    db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": update_fields})
    updated_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
    updated_stats["_id"] = str(updated_stats["_id"])

    return {
        "message": "SQ2 decision processed successfully",
        "updatedStats": {**updated_stats, "user_id": str(updated_stats["user_id"])},
        "sq2_outcome": sq2_outcome
    }



# @router.put("/decision/q3")
# async def q3_decision(request: Q3DecisionRequest, current_user: dict = Depends(get_current_user)):
#     user_id = current_user["_id"]
#     stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
#     if stats is None:
#         raise HTTPException(status_code=404, detail="Stats not found for the current user")
    
#     if request.decision not in ["barista", "freelancer"]:
#         raise HTTPException(status_code=400, detail="Invalid decision. Must be 'barista' or 'freelancer'.")

#     update_fields = {
#         "q3_decision": request.decision,
#         "q3_done": True
#     }

#     if request.decision == "barista":
#         new_money = stats["money"] + 100
#         update_fields["money"] = new_money
#         update_fields["points"] = stats["points"] + 15
#         rewards = [
#             "Gains customer service & teamwork skills",
#             "Opportunity to earn extra through tips",
#             "Hands-on experience in food service"
#         ]
#         consequences = [
#             "Physically demanding (long hours of standing)",
#             "Stressful during peak hours"
#         ]
#     elif request.decision == "freelancer":
#         new_money = stats["money"] + 150
#         update_fields["money"] = new_money
#         update_fields["points"] = stats["points"] + 10
#         rewards = [
#             "Flexible schedule, no commute",
#             "Builds digital and writing skills",
#             "Potential to scale up earnings"
#         ]
#         consequences = [
#             "Unstable income, may not get clients regularly",
#             "Requires strong self-discipline and time management"
#         ]

#     q3_outcome = {
#         "rewards": rewards,
#         "consequences": consequences
#     }
#     update_fields["q3_outcome"] = q3_outcome

#     db["stats"].update_one({"user_id": ObjectId(user_id)}, {"$set": update_fields})
#     updated_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
#     updated_stats["_id"] = str(updated_stats["_id"])

#     return {
#         "message": "Q3 decision processed successfully",
#         "updatedStats": {**updated_stats, "user_id": str(updated_stats["user_id"])},
#         "q3_outcome": q3_outcome
#     }



#     # Leaderboard routes
# @router.get("/leaderboard/medals", response_model=List[LeaderboardEntry])
# async def get_leaderboard_by_medals():
#     leaderboard = db["stats"].find().sort([("medals", -1), ("money", -1)]).limit(10)
#     leaderboard_list = []
#     for entry in leaderboard:
#         leaderboard_list.append(LeaderboardEntry(
#             user_id=str(entry["user_id"]),
#             medals=entry.get("medals", []),
#             money=entry["money"]
#         ))
#     return leaderboard_list