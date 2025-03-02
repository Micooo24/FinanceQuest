from fastapi import APIRouter, HTTPException
from models.minibudget import minibudget
from controllers.minibudget import save_minibudget, get_minibudget, update_minibudget

router = APIRouter()

@router.post("/create-minibudget")
async def complete_game(minibudget: minibudget):
    return save_minibudget(minibudget)

@router.get("/get-minibudget/{user_id}")
async def read_minibudget(user_id: str):
    minibudget_data = get_minibudget(user_id)
    if minibudget_data:
        return minibudget_data
    else:
        raise HTTPException(status_code=404, detail="Minibudget not found")

@router.put("/update-minibudget/{user_id}")
async def modify_minibudget(user_id: str, minibudget_data: minibudget):
    result = update_minibudget(user_id, minibudget_data)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result