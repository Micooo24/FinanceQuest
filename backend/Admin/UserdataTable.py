# from fastapi import APIRouter, HTTPException, Body
# from fastapi.responses import JSONResponse
# from bson import ObjectId
# from datetime import datetime
# from models.users import Role

# # MongoDB and Secret Key
# from config.db import db  
# from utils.utils import SECRET_KEY
# import logging

# router = APIRouter()

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# @router.post("/create-user")
# async def create_user(
#     username: str = Body(...),
#     email: str = Body(...),
#     password: str = Body(...),
#     birthday: str = Body(...),
#     role: Role = Body(Role.user),
#     verified: bool = Body(False),
#     img_path: str = Body(None)
# ):
#     try:
#         if db["users"].find_one({"email": email}):
#             raise HTTPException(status_code=400, detail="Email already registered")

#         user_dict = {
#             "username": username,
#             "email": email,
#             "password": password,
#             "birthday": birthday,
#             "img_path": img_path,
#             "verified": verified,
#             "role": role,
#             "created_at": datetime.now()
#         }
#         inserted_user = db["users"].insert_one(user_dict)
#         user_dict["_id"] = str(inserted_user.inserted_id)

#         return JSONResponse(content={"message": "User created successfully", "user": user_dict})
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# # @router.get("/get-user/{user_id}")
# # async def get_user(user_id: str):
# #     try:
# #         user = db["users"].find_one({"_id": ObjectId(user_id)})
# #         if not user:
# #             raise HTTPException(status_code=404, detail="User not found")
# #         user["_id"] = str(user["_id"])
# #         return JSONResponse(content={"user": user})
# #     except Exception as e:
# #         logger.error(f"An error occurred: {str(e)}")
# #         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# @router.get("/get-users")
# async def get_users():
#     try:
#         users = list(db["users"].find())
#         for user in users:
#             user["_id"] = str(user["_id"])
#         return JSONResponse(content={"users": users})
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# @router.put("/update-user/{user_id}")
# async def update_user(
#     user_id: str,
#     username: str = Body(None),
#     email: str = Body(None),
#     password: str = Body(None),
#     birthday: str = Body(None),
#     role: Role = Body(None),
#     verified: bool = Body(None),
#     img_path: str = Body(None)
# ):
#     try:
#         update_data = {}
#         if username is not None:
#             update_data["username"] = username
#         if email is not None:
#             update_data["email"] = email
#         if password is not None:
#             update_data["password"] = password
#         if birthday is not None:
#             update_data["birthday"] = birthday
#         if role is not None:
#             update_data["role"] = role
#         if verified is not None:
#             update_data["verified"] = verified
#         if img_path is not None:
#             update_data["img_path"] = img_path

#         result = db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
#         if result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="User not found")

#         return JSONResponse(content={"message": "User updated successfully"})
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# @router.delete("/delete-user/{user_id}")
# async def delete_user(user_id: str):
#     try:
#         result = db["users"].delete_one({"_id": ObjectId(user_id)})
#         if result.deleted_count == 0:
#             raise HTTPException(status_code=404, detail="User not found")

#         return JSONResponse(content={"message": "User deleted successfully"})
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


from fastapi import APIRouter, HTTPException, Body, UploadFile, File
from fastapi.responses import JSONResponse
from bson import ObjectId
from datetime import timedelta, datetime, date  
from models.users import Role
from config.db import db  
from config.cloudinary import upload_image
import logging

router = APIRouter()

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# @router.post("/create-user")
# async def create_user(
#     username: str = Body(...),
#     email: str = Body(...),
#     password: str = Body(...),
#     birthday: str = Body(...),
#     role: Role = Body(Role.user),
#     verified: bool = Body(False),
#     img_file: UploadFile = File(None)  # Expecting an image file
# ):
#     try:
#         if db["users"].find_one({"email": email}):
#             raise HTTPException(status_code=400, detail="Email already registered")

#         # Upload image to Cloudinary if provided
#         img_url = None
#         if img_file:
#             img_url = upload_image(img_file.file)

#         user_dict = {
#             "username": username,
#             "email": email,
#             "password": password,  # You should hash passwords before storing
#             "birthday": birthday,
#             "img_path": img_url,
#             "verified": verified,
#             "role": role,
#             "created_at": datetime.now()
#         }
#         inserted_user = db["users"].insert_one(user_dict)
#         user_dict["_id"] = str(inserted_user.inserted_id)

#         return JSONResponse(content={"message": "User created successfully", "user": user_dict})
#     except Exception as e:
#         logger.error(f"An error occurred: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
from fastapi import APIRouter, HTTPException, Body, UploadFile, File,  Form
from fastapi.responses import JSONResponse
from bson import ObjectId
from datetime import datetime
from models.users import Role
from config.db import db  
from config.cloudinary import upload_image
import logging
import bcrypt


router = APIRouter()

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from datetime import datetime
import bcrypt
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/create-user")
async def create_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    birthday: str = Form(...),
    role: str = Form("user"),  
    verified: bool = Form(False),
    img_file: UploadFile = File(None)  
):
    try:
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        img_url = None
        if img_file:
            img_url = upload_image(img_file.file)

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        birthday_date = datetime.strptime(birthday, "%Y-%m-%d").date()

        user_dict = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "birthday": str(birthday_date),  
            "img_path": img_url,
            "verified": verified,
            "role": role,
            "created_at": datetime.now()
        }
        inserted_user = db["users"].insert_one(user_dict)
        user_dict["_id"] = str(inserted_user.inserted_id)  

        return {"message": "User created successfully", "user": user_dict}
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/get-users")
async def get_users():
    try:
        users = list(db["users"].find())

        for user in users:
            user["_id"] = str(user["_id"])

            for key, value in user.items():
                if isinstance(value, datetime):
                    user[key] = value.isoformat()

            if user.get("img_path"):
                user["img_url"] = user["img_path"]  

        return JSONResponse(content={"users": users})

    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.put("/update-user/{user_id}")
async def update_user(
    user_id: str,
    username: str = Form(None),
    email: str = Form(None),
    password: str = Form(None),
    birthday: str = Form(None),
    role: str = Form(None),  
    verified: bool = Form(None),
    img_file: UploadFile = File(None)
):
    try:
        update_data = {}

        if username is not None:
            update_data["username"] = username
        if email is not None:
            update_data["email"] = email
        if password is not None:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            update_data["password"] = hashed_password.decode('utf-8')
        if birthday is not None:
            birthday_date = datetime.strptime(birthday, "%Y-%m-%d").date()
            update_data["birthday"] = str(birthday_date)
        if role is not None:
            update_data["role"] = role
        if verified is not None:
            update_data["verified"] = verified
        
        if img_file:
            img_url = upload_image(img_file.file)
            update_data["img_path"] = img_url

        result = db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return JSONResponse(content={"message": "User updated successfully"})
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.delete("/delete-user/{user_id}")
async def delete_user(user_id: str):
    try:
        result = db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": {"deleted": True}})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return JSONResponse(content={"message": "User deleted successfully"})
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")