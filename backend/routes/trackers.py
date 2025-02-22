# from fastapi import APIRouter
# from controllers.trackers import (
#     create_monthly_tracker,
#     get_monthly_tracker,
#     update_monthly_tracker,
#     delete_monthly_tracker
# )
# from models.trackers import MonthlyTracker
# from typing import List, Dict

# router = APIRouter()

# # Create a new monthly tracker
# @router.post("/create-tracker", response_model=MonthlyTracker)
# def create(data: MonthlyTracker):
#     return create_monthly_tracker(data)

# # Get a specific monthly tracker by year and month
# # @router.get("/get-tracker/{year}/{month}", response_model=List[MonthlyTracker])  # Updated response_model
# # def get(year: int, month: int):
# #     return get_monthly_tracker(year, month)  # Updated function call

# @router.get("/get-tracker/{year}/{month}", response_model=List[Dict])  
# def get(year: int, month: int):
#     return get_monthly_tracker(year, month)

# # Update a specific monthly tracker
# @router.put("/update-tracker/{tracker_id}", response_model=MonthlyTracker)
# def update(tracker_id: str, data: MonthlyTracker):
#     return update_monthly_tracker(tracker_id, data)

# # Delete a specific monthly tracker
# @router.delete("/delete-tracker/{tracker_id}")
# def delete(tracker_id: str):
#     return delete_monthly_tracker(tracker_id)

from fastapi import APIRouter, HTTPException
from controllers.trackers import (
    create_monthly_tracker,
    get_monthly_tracker,
    update_monthly_tracker,
    delete_monthly_tracker
)
from models.trackers import MonthlyTracker
from typing import List, Dict

router = APIRouter()

# Create a new monthly tracker
@router.post("/create-tracker", response_model=MonthlyTracker)
def create(data: MonthlyTracker):
    return create_monthly_tracker(data)

# Get a specific monthly tracker by year, month, and user_id
@router.get("/get-tracker/{year}/{month}/{user_id}", response_model=List[Dict])
def get(year: int, month: int, user_id: str):
    return get_monthly_tracker(year, month, user_id)

# Update a specific monthly tracker
@router.put("/update-tracker/{tracker_id}", response_model=MonthlyTracker)
def update(tracker_id: str, data: MonthlyTracker):
    return update_monthly_tracker(tracker_id, data)

# Delete a specific monthly tracker
@router.delete("/delete-tracker/{year}/{month}/{user_id}")
def delete(year: int, month: int, user_id: str):
    return delete_monthly_tracker(year, month, user_id)