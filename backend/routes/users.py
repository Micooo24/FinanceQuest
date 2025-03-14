from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Request, Depends
from fastapi.responses import JSONResponse

# MongoDB and Secret Key
from config.db import db  
from utils.utils import SECRET_KEY

# Cloudinary
import cloudinary.uploader
import config.cloudinary 

# Logging
import logging

from itsdangerous import URLSafeTimedSerializer
from bson import ObjectId
import bcrypt
from utils.utils import create_access_token, get_current_user, generate_otp, send_verification_email
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

# Initialize the serializer with the SECRET_KEY
serializer = URLSafeTimedSerializer(SECRET_KEY)

def verify_token_with_leeway(token, leeway=60):
    try:
        id_info = auth.verify_id_token(token)
        exp = id_info.get('exp')
        if exp:
            now = datetime.utcnow().timestamp()
            if now > exp + leeway:
                raise ValueError("Token expired")
        return id_info
    except Exception as e:
        raise ValueError(f"Token verification failed: {str(e)}")
   



@router.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    birthday: date = Form(...), 
    verified: bool = Form(False),
    img: UploadFile = File(None)  # Make img optional
):
    try:
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        img_url = None
        if img:
            try:
                # Ensure the "users" folder exists in Cloudinary
                result = cloudinary.uploader.upload(img.file, folder="users")
                img_url = result.get("secure_url")
            except Exception as e:
                logger.error(f"Image upload failed: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
        
        birthday_str = birthday.strftime("%Y-%m-%d")
        
        otp = generate_otp()
        
        user_dict = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "birthday": birthday_str,
            "img_path": img_url,
            "verified": verified,
            "role": Role.user,
            "created_at": datetime.now().isoformat(),  # Add created_at field
            "otp": otp  # Store OTP in the user's document
        }
        inserted_user = db["users"].insert_one(user_dict)
        user_dict["_id"] = str(inserted_user.inserted_id)

        # Send verification email with OTP
        send_verification_email(email, otp)
        
        return JSONResponse(content={"email": email, "otp": otp})
    
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.post("/verify-email")
async def verify_email(email: str = Body(...), otp: int = Body(...)):
    try:
        user = db["users"].find_one({"email": email})
        if not user or user.get("otp") != otp:
            raise HTTPException(status_code=400, detail="Invalid OTP or user does not exist")

        db["users"].update_one({"email": email}, {"$set": {"verified": True}, "$unset": {"otp": ""}})
        return JSONResponse(content={"message": "Email verified successfully"})
    except Exception as e:
        logger.error(f"Email verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Email verification failed")

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
        
        if not user["verified"]:
            raise HTTPException(status_code=400, detail="Email not verified. Please check your email to verify your account.")
       
        # Apply 'is_active' restriction only to normal users, not admins
        if user["role"] == "user" and not user.get("is_active", True):  
            raise HTTPException(status_code=403, detail="Your account has been deactivated. Please contact support.")

        access_token_expires = timedelta(days=7)
        access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)
        
        # Initialize stats for the user if they don't already exist
        user_id = user["_id"]
        existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
        if not existing_stats:
            new_stats = {
                "user_id": ObjectId(user_id),
                "money": 5000,
                "points": 0,
                "location": {
                    "x": -8.389501036635487,
                    "y": 0.5,
                    "z": 33.26385975348472
                }
            }
            db["stats"].insert_one(new_stats)
        
        return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    except HTTPException as e:
        # Allow HTTPExceptions to propagate
        raise e
    except Exception as e:
        # Catch unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    
# @router.post("/google-signup")
# async def google_signup(request: Request):
#     try:
#         body = await request.json()
#         token = body.get("token")
#         logger.info(f"Received token: {token}")  # Log the token

#         if not token:
#             raise HTTPException(status_code=400, detail="Token is required")

#         # Verify the token with Firebase
#         try:
#             id_info = auth.verify_id_token(token)
#             logger.info(f"Token verified successfully: {id_info}")  # Log the decoded token info
#         except ValueError as e:
#             logger.error(f"Token verification failed: {str(e)}")
#             raise HTTPException(status_code=400, detail=f"Token verification failed: {str(e)}")

#         # Retrieve user information
#         username = id_info.get("name")
#         email = id_info.get("email")
#         birthday = id_info.get("birthday", None)  # Handle missing birthday
#         img_path = id_info.get("picture")

#         # Check if user already exists in MongoDB
#         if db["users"].find_one({"email": email}):
#             raise HTTPException(status_code=400, detail="Email already registered")

#         # Check if user already exists in Firebase
#         try:
#             user_record = auth.get_user_by_email(email)
#             logger.info(f"User already exists in Firebase: {user_record.uid}")
#         except auth.UserNotFoundError:
#             # Create a new user in Firebase
#             try:
#                 user_record = auth.create_user(
#                     email=email,
#                     email_verified=True,
#                     display_name=username,
#                     photo_url=img_path,
#                 )
#                 logger.info(f"Firebase user created successfully: {user_record.uid}")
#             except Exception as e:
#                 logger.error(f"Firebase user creation failed: {str(e)}")
#                 raise HTTPException(status_code=500, detail=f"Firebase user creation failed: {str(e)}")

#         # Save additional user information to your MongoDB database
#         try:
#             user_dict = {
#                 "username": username,
#                 "email": email,
#                 "password": None,  # Explicitly set password to None
#                 "birthday": birthday,
#                 "img_path": img_path,
#                 "firebase_uid": user_record.uid,
#                 "role": "user",  # Set role to admin
#                 "created_at": datetime.now().isoformat()  # Add created_at field
#             }
#             inserted_user = db["users"].insert_one(user_dict)
#             user_dict["_id"] = str(inserted_user.inserted_id)
#             logger.info(f"MongoDB user created successfully: {user_dict['_id']}")
#         except Exception as e:
#             logger.error(f"MongoDB user creation failed: {str(e)}")
#             raise HTTPException(status_code=500, detail=f"MongoDB user creation failed: {str(e)}")

#         return JSONResponse(content={"message": "User registered successfully", "user": user_dict})

#     except HTTPException as e:
#         logger.error(f"HTTPException: {str(e)}")
#         raise e
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}") 

# @router.post("/google-login")
# async def google_login(request: Request):
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
                "role": Role.user,
                "verified": True ,
                "is_active": True,  # Ensure new users are active by default
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        else:
            if user.get("role") == "user" and not user.get("is_active", True):
                raise HTTPException(status_code=403, detail="Your account has been deactivated. Please contact support.")

            user_dict = user
            user_dict["_id"] = str(user_dict["_id"])

        # Initialize stats for the user if they don't already exist
        user_id = user_dict["_id"]
        existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
        if not existing_stats:
            new_stats = {
                "user_id": ObjectId(user_id),
                "money": 5000,
                "points": 0,
                "location": {
                    "x": -8.389501036635487,
                    "y": 0.5,
                    "z": 33.26385975348472
                }
            }
            db["stats"].insert_one(new_stats)

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

@router.post("/google-signup")
async def google_signup(request: Request):
    try:
        body = await request.json()
        token = body.get("token")
        logger.info(f"Received token: {token}")  # Log the token

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase and handle clock skew
        try:
            id_info = verify_token_with_leeway(token, leeway=60)
            logger.info(f"Token verified successfully: {id_info}")  # Log the decoded token info
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Token verification failed: {str(e)}")

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
                )
                logger.info(f"Firebase user created successfully: {user_record.uid}")
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Firebase user creation failed: {str(e)}")

        # Save additional user information to your MongoDB database
        try:
            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": "user",  # Set role to admin
                "created_at": datetime.now().isoformat()  # Add created_at field
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
            logger.info(f"MongoDB user created successfully: {user_dict['_id']}")
        except Exception as e:
            logger.error(f"MongoDB user creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"MongoDB user creation failed: {str(e)}")

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

        # Verify the token with Firebase and handle clock skew
        try:
            id_info = verify_token_with_leeway(token, leeway=60)
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
                "role": Role.user,
                "verified": True ,
                "is_active": True,  # Ensure new users are active by default
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        else:
            if user.get("role") == "user" and not user.get("is_active", True):
                raise HTTPException(status_code=403, detail="Your account has been deactivated. Please contact support.")

            user_dict = user
            user_dict["_id"] = str(user_dict["_id"])

        # Initialize stats for the user if they don't already exist
        user_id = user_dict["_id"]
        existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
        if not existing_stats:
            new_stats = {
                "user_id": ObjectId(user_id),
                "money": 5000,
                "points": 0,
                "location": {
                    "x": -8.389501036635487,
                    "y": 0.5,
                    "z": 33.26385975348472
                }
            }
            db["stats"].insert_one(new_stats)

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
    

@router.put("/update-profile/{user_id}")
async def update_profile(
    current_user: dict = Depends(get_current_user),
    username: str = Body(None),
    birthday: date = Body(None),
    img: UploadFile = File(None)
):
    user_id = current_user["_id"]
    try:
        user = db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        update_dict = {}
        if username:
            update_dict["username"] = username

        if birthday:
            update_dict["birthday"] = birthday.strftime("%Y-%m-%d")
        if img:
            try:
                # Ensure the "users" folder exists in Cloudinary
                result = cloudinary.uploader.upload(img.file, folder="users")
                img_url = result.get("secure_url")
                update_dict["img_path"] = img_url
            except Exception as e:
                logger.error(f"Image upload failed: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
        
        db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": update_dict})
        return JSONResponse(content={"message": "Profile updated successfully"})
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user["_id"]
        user = db["users"].find_one(
            {"_id": ObjectId(user_id)},
            {"username": 1, "email": 1, "birthday": 1, "img_path": 1}
        )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return JSONResponse(content={"user": user})
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")