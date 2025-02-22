# from fastapi import HTTPException
# from models.trackers import MonthlyTracker
# from config.db import db  # Importing the db from db.py
# from bson import ObjectId
# from typing import List, Dict

# # Create a monthly tracker
# def create_monthly_tracker(data: MonthlyTracker) -> MonthlyTracker:
#     result = db.monthly_tracker.insert_one(data.dict())
#     if not result.inserted_id:
#         raise HTTPException(status_code=500, detail="Failed to insert data")
#     return data

# # Get a specific monthly tracker
# # def get_monthly_tracker(year: int, month: int) -> List[MonthlyTracker]:
# #     data = db.monthly_tracker.find({"year": year, "month": month})
# #     trackers = [MonthlyTracker(**item, id=str(item["_id"])) for item in data]  # Convert _id to str
    
# #     if not trackers:
# #         raise HTTPException(status_code=404, detail="Records not found")

# #     return trackers 

# def get_monthly_tracker(year: int, month: int) -> List[Dict]:
#     data = db.monthly_tracker.find({"year": year, "month": month})
    
#     trackers = []
#     for item in data:
#         item["_id"] = str(item["_id"])  # Convert ObjectId to string
#         trackers.append(item)

#     if not trackers:
#         raise HTTPException(status_code=404, detail="Records not found")

#     return trackers



# # Update a monthly tracker
# def update_monthly_tracker(tracker_id: str, data: MonthlyTracker) -> MonthlyTracker:
#     result = db.monthly_tracker.replace_one({"_id": ObjectId(tracker_id)}, data.dict())
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Record not found")
#     return data

# # Delete a monthly tracker
# def delete_monthly_tracker(year: int, month: int):
#     result = db.monthly_tracker.delete_one({"year": year, "month": month})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=404, detail="Record not found")
#     return {"message": "Record deleted successfully"}

from fastapi import HTTPException
from models.trackers import MonthlyTracker
from config.db import db  # Importing the db from db.py
from bson import ObjectId
from typing import List, Dict

# Create a monthly tracker
def create_monthly_tracker(data: MonthlyTracker) -> MonthlyTracker:
    result = db.monthly_tracker.insert_one(data.dict())
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to insert data")
    return data

# Get a specific monthly tracker
def get_monthly_tracker(year: int, month: int, user_id: str) -> List[Dict]:
    data = db.monthly_tracker.find({"year": year, "month": month, "user_id": user_id})
    
    trackers = []
    for item in data:
        item["_id"] = str(item["_id"])  # Convert ObjectId to string
        trackers.append(item)

    if not trackers:
        raise HTTPException(status_code=404, detail="Records not found")

    return trackers

# Update a monthly tracker
def update_monthly_tracker(tracker_id: str, data: MonthlyTracker) -> MonthlyTracker:
    result = db.monthly_tracker.replace_one({"_id": ObjectId(tracker_id)}, data.dict())
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return data

# Delete a monthly tracker
def delete_monthly_tracker(year: int, month: int, user_id: str):
    result = db.monthly_tracker.delete_one({"year": year, "month": month, "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Record not found")
    return {"message": "Record deleted successfully"}