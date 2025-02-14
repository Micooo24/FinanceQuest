from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from config.db import db  # Import the MongoDB database
from bson import ObjectId
import logging

# Secret key for signing tokens
SECRET_KEY = "b6562e66f1c68ffe24fa"

ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme)):
    logging.info(f"Token received: {token}")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logging.info(f"Payload decoded: {payload}")
        user_id: str = payload.get("sub")
        if user_id is None:
            logging.error("Invalid authentication credentials: user_id is None")
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        logging.info(f"Querying user with email: {user_id}")
        user = db["users"].find_one({"email": user_id})
        logging.info(f"Database query result: {user}")
        if user is None:
            logging.error(f"User not found: {user_id}")
            raise HTTPException(status_code=401, detail="User not found")
        
        logging.info(f"User authenticated: {user_id}")
        return {"_id": user["_id"]}
    except JWTError as e:
        logging.error(f"JWTError: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")