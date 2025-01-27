from fastapi import APIRouter, HTTPException, File, UploadFile, Form
from fastapi.responses import JSONResponse
from config_db import db  # Import the MongoDB database
import cloudinary.uploader
import config_cloudinary  # Ensure this is imported to configure Cloudinary
import logging
from bson import ObjectId
import bcrypt
from utils import create_access_token
from datetime import timedelta, datetime, date  # Import date
from models.users import Role
from fastapi import Body

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
@router.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    birthday: date = Form(...),  # Use date type for birthday
    disabled: bool = Form(False),
    img: UploadFile = File(...)
):
    try:
        # Check if the user already exists
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Upload the image to Cloudinary
        try:
            result = cloudinary.uploader.upload(img.file)
            img_url = result.get("secure_url")
        except Exception as e:
            logger.error(f"Image upload failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
        
        # Convert birthday to string
        birthday_str = birthday.strftime("%Y-%m-%d")
        
        # Save the user to the MongoDB database
        user_dict = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "birthday": birthday_str,
            "img_path": img_url,
            "disabled": disabled,
            "role": Role.user  # Set default role to 'user'
        }
        inserted_user = db["users"].insert_one(user_dict)
        user_dict["_id"] = str(inserted_user.inserted_id)
        
        return JSONResponse(content={"message": "User registered successfully", "user": user_dict})
    
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.post("/login")
async def login(
    email: str = Body(...),  # Accept email as part of the request body
    password: str = Body(...),  # Accept password as part of the request body
):
    try:
        # Your existing login logic
        user = db["users"].find_one({"email": email})
        if not user:
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)
        
        return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
