from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from bson import ObjectId
from typing import Optional
from models.characters import Character, Gender
from config_db import db  # Import the MongoDB database
from utils import get_current_user  # Import the function to get the current authenticated user
import logging

router = APIRouter()

class CharacterCreate(BaseModel):
    gender: Gender
    description: str

@router.post("/create")
async def create_character(character: CharacterCreate, current_user: dict = Depends(get_current_user)):
    logging.info(f"Authenticated user: {current_user}")
    try:
        # Create a new character associated with the authenticated user
        new_character = Character(
            gender=character.gender,
            description=character.description,
            user_id=current_user["_id"]
        )
        # Convert the CharacterType enum to its value
        new_character_dict = new_character.dict()
        new_character_dict["gender"] = new_character.gender.value

        inserted_character = db["characters"].insert_one(new_character_dict)
        character_id = inserted_character.inserted_id

        # Update the user with the character_id
        db["users"].update_one({"_id": current_user["_id"]}, {"$set": {"character_id": character_id}})
        
        logging.info(f"Character created successfully: {character_id}")
        return {"message": "Character created successfully", "character_id": str(character_id)}
    
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")