# import logging
# from fastapi import APIRouter, HTTPException
# from typing import List
# from bson import ObjectId
# from models.minibudget import minibudget
# from models.users import User
# from config.db import db  # MongoDB connection

# logger = logging.getLogger(__name__)

# router = APIRouter()

# @router.get("/get-savings")
# def get_top_savings():
#     """Fetch the top 5 users with the highest savings balance"""
#     try:
#         logger.info("Fetching top 5 users with the highest savings balance")
#         # Fetch all minibudgets where balance > 0 and sort by balance (descending)
#         all_budgets = list(db.minibudget.find({"balance": {"$gt": 0}}).sort("balance", -1).limit(5))
#         logger.info(f"Fetched minibudgets: {all_budgets}")
        
#         # Fetch usernames for each minibudget
#         for budget in all_budgets:
#             user = db.users.find_one({"_id": ObjectId(budget["user_id"])})  # Convert string ID to ObjectId
#             if user:
#                 budget["username"] = user["username"]
#             else:
#                 budget["username"] = "Unknown"
#             logger.info(f"Processed budget: {budget}")

#         # Convert ObjectId to string for JSON serialization
#         for budget in all_budgets:
#             budget["_id"] = str(budget["_id"])
#             budget["user_id"] = str(budget["user_id"])

#         return all_budgets
#     except Exception as e:
#         logger.error(f"Error fetching users with balance: {str(e)}")
#         raise HTTPException(status_code=500, detail="Error fetching users with balance")

import logging
from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from models.minibudget import minibudget
from models.users import User
from config.db import db  # MongoDB connection

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/get-savings")
def get_top_savings():
    """Fetch the top 5 users with the highest savings balance"""
    try:
        logger.info("Fetching top 5 users with the highest savings balance")
        
        # Fetch the latest minibudget for each user where balance > 0 and sort by balance (descending)
        pipeline = [
            {"$match": {"balance": {"$gt": 0}}},
            {"$sort": {"user_id": 1, "started_at": -1}},
            {"$group": {
                "_id": "$user_id",
                "latest_budget": {"$first": "$$ROOT"}
            }},
            {"$replaceRoot": {"newRoot": "$latest_budget"}},
            {"$sort": {"balance": -1}},
            {"$limit": 5}
        ]
        all_budgets = list(db.minibudget.aggregate(pipeline))
        logger.info(f"Fetched minibudgets: {all_budgets}")
        
        # Fetch usernames for each minibudget
        for budget in all_budgets:
            user = db.users.find_one({"_id": ObjectId(budget["user_id"])})  # Convert string ID to ObjectId
            if user:
                budget["username"] = user["username"]
            else:
                budget["username"] = "Unknown"
            logger.info(f"Processed budget: {budget}")

        # Convert ObjectId to string for JSON serialization
        for budget in all_budgets:
            budget["_id"] = str(budget["_id"])
            budget["user_id"] = str(budget["user_id"])

        return all_budgets
    except Exception as e:
        logger.error(f"Error fetching users with balance: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching users with balance")
    
    
@router.get("/get-investments")
def get_top_savings():
    """Fetch the top 5 users with the highest savings balance"""
    try:
        logger.info("Fetching top 5 users with the highest savings balance")
        
        # Fetch the latest minibudget for each user where balance > 0 and sort by balance (descending)
        pipeline = [
            {"$match": {"score": {"$gt": 0}}},
            {"$sort": {"user_id": 1, "started_at": -1}},
            {"$group": {
                "_id": "$user_id",
                "latest_budget": {"$first": "$$ROOT"}
            }},
            {"$replaceRoot": {"newRoot": "$latest_budget"}},
            {"$sort": {"score": -1}},
            {"$limit": 5}
        ]
        all_budgets = list(db.miniInvesting.aggregate(pipeline))
        logger.info(f"Fetched minibudgets: {all_budgets}")
        
        # Fetch usernames for each minibudget
        for budget in all_budgets:
            user = db.users.find_one({"_id": ObjectId(budget["user_id"])})  # Convert string ID to ObjectId
            if user:
                budget["username"] = user["username"]
            else:
                budget["username"] = "Unknown"
            logger.info(f"Processed budget: {budget}")

        # Convert ObjectId to string for JSON serialization
        for budget in all_budgets:
            budget["_id"] = str(budget["_id"])
            budget["user_id"] = str(budget["user_id"])

        return all_budgets
    except Exception as e:
        logger.error(f"Error fetching users with balance: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching users with balance")

@router.get("/get-budgets")
def get_top_savings():
    """Fetch the top 5 users with the highest savings balance"""
    try:
        logger.info("Fetching top 5 users with the highest savings balance")
        
        # Fetch the latest minibudget for each user where balance > 0 and sort by balance (descending)
        pipeline = [
            {"$match": {"money": {"$gt": 0}}},
            {"$sort": {"user_id": 1, "started_at": -1}},
            {"$group": {
                "_id": "$user_id",
                "latest_budget": {"$first": "$$ROOT"}
            }},
            {"$replaceRoot": {"newRoot": "$latest_budget"}},
            {"$sort": {"money": -1}},
            {"$limit": 5}
        ]
        all_budgets = list(db.stats.aggregate(pipeline))
        logger.info(f"Fetched minibudgets: {all_budgets}")
        
        # Fetch usernames for each minibudget
        for budget in all_budgets:
            user = db.users.find_one({"_id": ObjectId(budget["user_id"])})  
            if user:
                budget["username"] = user["username"]
            else:
                budget["username"] = "Unknown"
            logger.info(f"Processed budget: {budget}")

        # Convert ObjectId to string for JSON serialization
        for budget in all_budgets:
            budget["_id"] = str(budget["_id"])
            budget["user_id"] = str(budget["user_id"])

        return all_budgets
    except Exception as e:
        logger.error(f"Error fetching users with balance: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching users with balance")