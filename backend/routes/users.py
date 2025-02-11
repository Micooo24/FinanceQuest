from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse
from config_db import db  
import cloudinary.uploader
import config_cloudinary 
import logging
from bson import ObjectId
import bcrypt
from utils import create_access_token
from datetime import timedelta, datetime, date  
from models.users import Role
from fastapi import Body

# firebase
from google.auth.transport import requests   
from google.oauth2 import id_token 
from firebase_backend import firebaseconfig
from firebase_admin import auth

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    birthday: date = Form(...), 
    disabled: bool = Form(False),
    img: UploadFile = File(...)
):
    try:
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        try:
            result = cloudinary.uploader.upload(img.file)
            img_url = result.get("secure_url")
        except Exception as e:
            logger.error(f"Image upload failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
        
        birthday_str = birthday.strftime("%Y-%m-%d")
        
        user_dict = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "birthday": birthday_str,
            "img_path": img_url,
            # "disabled": disabled,
            "role": Role.user  
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
    email: str = Body(...), 
    password: str = Body(...),  
):
    try:
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
    
@router.post("/google-signup")
async def google_signup(request: Request):
    try:
        body = await request.json()
        token = body.get("token")
        logger.info(f"Received token: {token}")  # Log the token

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        username = id_info.get("name")
        email = id_info.get("email")
        birthday = id_info.get("birthday", None)  # Handle missing birthday
        img_path = id_info.get("picture")

        # Check if user already exists in MongoDB
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Check if user already exists in Firebase
        try:
            user_record = auth.get_user_by_email(email)
            logger.info(f"User already exists in Firebase: {user_record.uid}")
        except auth.UserNotFoundError:
            # Create a new user in Firebase
            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                    disabled=False
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

        # Save additional user information to your MongoDB database
        try:
            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        except Exception as e:
            logger.error(f"MongoDB user creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="MongoDB user creation failed")

        return JSONResponse(content={"message": "User registered successfully", "user": user_dict})

    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/google-login")
async def google_login(request: Request):
    try:
        body = await request.json()
        token = body.get("token")

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        email = id_info.get("email")

        # Check if user exists in the database
        user = db["users"].find_one({"email": email})
        if not user:
            # If user does not exist, create a new user in Firebase and the database
            username = id_info.get("name")
            birthday = id_info.get("birthday")
            img_path = id_info.get("picture")

            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                    disabled=False
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        else:
            user_dict = user
            user_dict["_id"] = str(user_dict["_id"])  # Convert ObjectId to string

        # Generate access token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(data={"sub": user_dict["email"]}, expires_delta=access_token_expires)

        return JSONResponse(content={"access_token": access_token, "token_type": "bearer", "user": user_dict})

    except ValueError as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Token verification failed")
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/facebook-signup")
async def facebook_signup(request: Request):
    try:
        body = await request.json()
        token = body.get("token")

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        username = id_info.get("name")
        email = id_info.get("email")
        birthday = id_info.get("birthday", None)  # Handle missing birthday
        img_path = id_info.get("picture")

        # Check if user already exists in MongoDB
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Check if user already exists in Firebase
        try:
            user_record = auth.get_user_by_email(email)
            logger.info(f"User already exists in Firebase: {user_record.uid}")
        except auth.UserNotFoundError:
            # Create a new user in Firebase
            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                    disabled=False
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

        # Save additional user information to your MongoDB database
        try:
            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        except Exception as e:
            logger.error(f"MongoDB user creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="MongoDB user creation failed")

        return JSONResponse(content={"message": "User registered successfully", "user": user_dict})

    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")