from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.responses import JSONResponse
from datetime import datetime, timezone
from bson import ObjectId
from typing import Optional, List
from config.db import db
from utils.utils import get_current_user
import logging
from models.blogReviews import BlogReview, Reply  # Updated import from models folder
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def format_username(username: Optional[str]) -> str:
    """
    Formats the username for anonymous users to show only the first letter and asterisks.
    Example: 'JohnDoe' -> 'J*****'
    """
    if not username:
        return "Anonymous"  
    return username[0] + '*' * (len(username) - 1) 
 
@router.get("/{user_id}")
async def get_user(user_id: str):
    try:
        # Convert user_id to ObjectId
        object_id = ObjectId(user_id)
        user = db["users"].find_one({"_id": object_id})  # Query the database
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"email": user["email"]}  # Return email
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
#Create comments
@router.post("/create")
async def create_review(
    blog_id: str = Body(...),
    comment: Optional[str] = Body(None),
    anonymous: bool = Body(False),
    token: dict = Depends(get_current_user)
):
    try:
        if not token or "_id" not in token:
            logging.error("Invalid or missing token")
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        
        user_id = str(token["_id"])  # Ensure user_id is a string
        user = db["users"].find_one({"_id": ObjectId(user_id)})
        
        if not user:
            logging.error(f"User with ID {user_id} not found")
            raise HTTPException(status_code=404, detail="User not found")
        
        username = user.get("username", "Anonymous")
        display_username = format_username(username) if anonymous else username
        
        blog_review = {
            "blog_id": blog_id,
            "comment": comment or "",
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
            "anonymous": anonymous,
            "like_count": 0,
            "replies": [],
            "user_id": user_id,
            "username": display_username
        }
        
        result = db["blog_reviews"].insert_one(blog_review)
        return JSONResponse(content={"message": "Review created successfully.", "id": str(result.inserted_id)})
    
    except Exception as e:
        logging.error(f"Failed to create review: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create review")

@router.get("/get_comments/{blog_id}")
async def get_comments(blog_id: str):
    try:
        # Log the received blog_id
        print(f"Received blog_id: {blog_id}")

        # Query MongoDB using the blog_id as a string
        blog_reviews = list(
            db["blog_reviews"].find(
                {"blog_id": blog_id},
                {
                  
                    "blog_id": 1,
                    "comment": 1,
                    "created_at": 1,
                    "updated_at": 1,
                    "anonymous": 1,
                    "like_count": 1,
                    "username": 1,
                    "_id": 1,  # Exclude MongoDB `_id`
                    "user_id":1,
                },
            )
        )

        # Log the raw query results
        print(f"Raw blog_reviews: {blog_reviews}")

        if not blog_reviews:
            raise HTTPException(status_code=404, detail="No comments found for this blog")

        # Function to clean and serialize each review
        def clean_review(review):
            # Convert datetime fields to ISO strings
            for field in ["created_at", "updated_at"]:
                if field in review and isinstance(review[field], datetime):
                    review[field] = review[field].isoformat()

                        # Convert ObjectId `_id` to string
            if "_id" in review and isinstance(review["_id"], ObjectId):
                review["_id"] = str(review["_id"])
            if "user_id" in review and isinstance(review["user_id"], ObjectId):
                review["user_id"] = str(review["user_id"])
                
            return review

        # Process each review in the list
        cleaned_reviews = [clean_review(review) for review in blog_reviews]

        # Log the cleaned reviews
        print(f"Cleaned reviews: {cleaned_reviews}")

        # Serialize the data to JSON-compatible format
        serialized_comments = jsonable_encoder(cleaned_reviews)
        print(f"Serialized comments: {serialized_comments}")

        # Return the serialized comments as a response
        return JSONResponse(content={"comments": serialized_comments})

    except HTTPException as http_exc:
        # Log known HTTP exceptions
        print(f"HTTPException: {http_exc.detail}")
        raise http_exc

    except Exception as e:
        # Log unexpected exceptions
        print(f"Exception occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

    
#update the comments
@router.put("/update_comment/{review_id}")
async def update_comment(
    review_id: str,
    request_body: dict = Body(...),
    token: dict = Depends(get_current_user)
):
    try:
        # Extract user ID from token
        user_id = str(token["_id"]) if isinstance(token, dict) and "_id" in token else str(token)

        # Fetch the user details
        user = db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            logger.error(f"User with ID {user_id} not found")
            raise HTTPException(status_code=404, detail="User not found")

        # Retrieve the review
        if ObjectId.is_valid(review_id):
            review_filter = {"_id": ObjectId(review_id)}
        else:
            review_filter = {"_id": review_id}

        review = db["blog_reviews"].find_one(review_filter)
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
        #is author function
        is_author = str(review["user_id"]) == user_id
        if not is_author:
            logger.warning(f"Permission denied for user {user_id} on review {review_id}")
            raise HTTPException(status_code=403, detail="Permission denied")
        # Ensure review ownership
        if str(review["user_id"]) != user_id:
            logger.warning(f"Permission denied for user {user_id} on review {review_id}")
            raise HTTPException(status_code=403, detail="Permission denied")

        # Update the comment and anonymous flag
        new_comment = request_body.get("comment")
        if not new_comment:
            raise HTTPException(status_code=400, detail="Comment is required")

        anonymous = request_body.get("anonymous", review.get("anonymous"))

        username = user.get("username", "Anonymous")
        display_username = format_username(username) if anonymous else username

        update_fields = {
            "comment": new_comment,
            "updated_at": datetime.now(timezone.utc),
            "username": display_username,
            "anonymous": bool(anonymous) if anonymous is not None else review.get("anonymous"),
        }

        db["blog_reviews"].update_one(
            review_filter,
            {"$set": update_fields}
        )

        return {"message": "Comment and anonymous status updated successfully"}

    except HTTPException as e:
        logger.warning(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"Failed to update comment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update comment")

#Delete controller
@router.delete("/delete/{review_id}")
async def delete_review(review_id: str, token: dict = Depends(get_current_user)):
    """
    Deletes a blog review if the user has permission.
    """
    try:
        # Extract user ID from token output
        user_id = str(token["_id"])  # Convert to string for comparison
        logging.info(f"User ID from token: {user_id}")
        
        # Convert IDs to ObjectId
        review_id = ObjectId(review_id)

        # Find the review
        review = db["blog_reviews"].find_one({"_id": review_id})
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")

        # Validate permissions
        if str(review["user_id"]) != user_id:
            raise HTTPException(status_code=403, detail="Permission denied")

        # Delete the review
        result = db["blog_reviews"].delete_one({"_id": review_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=500, detail="Failed to delete review")

        logging.info(f"Review {review_id} deleted by user {user_id}")
        return {"message": "Review deleted successfully"}
    except HTTPException as ex:
        logging.error(f"HTTPException: {ex.detail}")
        raise ex
    except Exception as ex:
        logging.error(f"Unexpected error in delete_review: {str(ex)}")
        raise HTTPException(status_code=500, detail="Internal server error")

#---
#Reply Router and Controller
#---



@router.post("/create_reply/{review_id}")
async def create_reply(
    review_id: str,  # ID of the review to reply to
    reply_text: str = Body(...),  # The text of the reply
    anonymous: bool = Body(False),  # Whether the reply is anonymous
    token: dict = Depends(get_current_user)  # Expecting token as a dictionary with user details
):
    try:
        # Extract the user_id from the token (it should be in the '_id' field)
        user_id = token.get('_id')  # This should now give us the ObjectId directly
        logger.info(f"Token received: {token}")
        logger.info(f"User ID extracted from token: {user_id}")

        # Fetch username if the reply is not anonymous
        username = None
        
        if not anonymous:  # If not anonymous, fetch username
            # Ensure the user_id is in ObjectId format
            logger.info(f"Looking up user in the database with ID: {user_id}")

            if isinstance(user_id, str):  # If user_id is a string, convert to ObjectId
                try:
                    user_id = ObjectId(user_id)
                except Exception as e:
                    logger.error(f"Error converting user_id to ObjectId: {str(e)}")
                    raise HTTPException(status_code=400, detail="Invalid user ID format")

            # Fetch the user from the database
            user = db["users"].find_one({"_id": user_id})
            if user:
                username = user.get("username", "Anonymous")
                logger.info(f"User found: {username}")
            else:
                logger.error(f"User with ID {user_id} not found in the database")
                raise HTTPException(status_code=404, detail="User not found")
        else:
            user = db["users"].find_one({"_id": user_id})
            
            if user:
                username = user.get("username", "Anonymous")
                logger.info(f"User found: {username}")
            else:
                logger.error(f"User with ID {user_id} not found in the database")
                raise HTTPException(status_code=404, detail="User not found")
            username = format_username(username)

        # Create a new reply object
        reply = Reply(
            user_id=user_id,
            reply_text=reply_text,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
            anonymous=anonymous,
            username=username
        )

        # Ensure the review_id is an ObjectId when querying MongoDB
        try:
            review_id = ObjectId(review_id)
        except Exception as e:
            logger.error(f"Error converting review_id to ObjectId: {str(e)}")
            raise HTTPException(status_code=400, detail="Invalid review ID format")

        # Find the blog review and append the reply
        blog_review = db["blog_reviews"].find_one({"_id": review_id})

        if not blog_review:
            logger.error(f"Blog review with ID {review_id} not found")
            raise HTTPException(status_code=404, detail="Review not found")

        # Append the reply to the list of replies
        reply_dict = reply.dict(exclude_unset=True)  # Ensure only set fields are included in the dictionary
        blog_review["replies"].append(reply_dict)

        # Update the blog review with the new replies array
        db["blog_reviews"].update_one({"_id": review_id}, {"$set": {"replies": blog_review["replies"]}})

        return {"message": "Reply added successfully."}

    except Exception as e:
        logger.error(f"Failed to create reply: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create reply")

#get
@router.get("/get_replies/{review_id}")
async def get_replies(
    review_id: str,  # ID of the review to get replies for
):
    try:
        # Find the blog review and fetch its replies
        blog_review = db["blog_reviews"].find_one({"_id": ObjectId(review_id)})

        if not blog_review:
            raise HTTPException(status_code=404, detail="Review not found")

        # Convert the MongoDB document into the BlogReview model
        blog_review_model = BlogReview(**blog_review)

        # Serialize the replies to a JSON-compatible format
        serialized_replies = jsonable_encoder(blog_review_model.replies)

        # Return the serialized replies
        return JSONResponse(content={"replies": serialized_replies})

    except Exception as e:
        logger.error(f"Failed to get replies: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get replies")
    
#update comment to a comment
@router.put("/update_reply/{review_id}/{index}")
async def update_reply(
    review_id: str,
    index: int,
    request_body: dict = Body(...),
    token: dict = Depends(get_current_user)
):
    """
    Updates a specific reply in a blog review.

    Args:
        review_id (str): The ID of the blog review.
        index (int): The index of the reply to be updated.
        request_body (dict): The JSON body containing "reply_text" and optionally "anonymous".
        token (dict): The authentication token of the current user.

    Returns:
        dict: A success message if the reply is updated.

    Raises:
        HTTPException: If the review or reply is not found, permission is denied, or an internal error occurs.
    """
    try:
        # Extract user ID from token
        user_id = ObjectId(token["_id"]) if isinstance(token, dict) and "_id" in token else ObjectId(token)
        logger.info(f"Current user ID: {user_id}")

        # Retrieve the blog review
        blog_review = db["blog_reviews"].find_one({"_id": ObjectId(review_id)})
        if not blog_review:
            raise HTTPException(status_code=404, detail="Review not found")
        logger.info(f"Retrieved blog review: {review_id}")

        # Validate the index
        if index < 0 or index >= len(blog_review.get("replies", [])):
            raise HTTPException(status_code=404, detail="Reply index out of range")

        # Fetch the reply data
        reply_data = blog_review["replies"][index]
        logger.info(f"Reply data before update: {reply_data}")

        # Check permissions
        is_reply_owner = reply_data["user_id"] == user_id
        has_admin_rights = is_admin(user_id)
        if not is_reply_owner and not has_admin_rights:
            logger.error(f"Permission denied. Reply user_id: {reply_data['user_id']}, Current user_id: {user_id}")
            raise HTTPException(status_code=403, detail="You do not have permission to update this reply")
       
        # Extract values from request body
        reply_text = request_body.get("reply_text", reply_data.get("reply_text"))
        anonymous = request_body.get("anonymous", reply_data.get("anonymous"))

        # Construct update fields
        update_fields = {f"replies.{index}.reply_text": reply_text}

        # Explicitly update anonymous if it's provided in the request
        if anonymous is not None:  # Ensures we update anonymous only if provided
            update_fields[f"replies.{index}.anonymous"] = bool(anonymous)

        # Perform update
        db["blog_reviews"].update_one(
            {"_id": ObjectId(review_id)},
            {"$set": update_fields}
        )
        logger.info(f"Reply updated for review_id: {review_id}, index: {index}")

        return {"message": "Reply updated successfully"}

    except HTTPException as e:
        logger.warning(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"Failed to update reply: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
# Delete a reply from a blog review
@router.delete("/delete_reply/{review_id}/{index}")
async def delete_reply(
    review_id: str,  # ID of the review
    index: int,  # Index of the reply to delete
    token: str = Depends(get_current_user)  # Token used for user identification
):
    """
    Deletes a reply from a blog review based on its index.

    Args:
        review_id (str): The ID of the blog review.
        index (int): The index of the reply to delete.
        token (str): The authentication token of the current user.

    Returns:
        JSONResponse: A success message if the reply is deleted.

    Raises:
        HTTPException: If the review or reply is not found, permission is denied, or an internal error occurs.
    """
    try:
        user_id = ObjectId(token["_id"]) if isinstance(token, dict) and "_id" in token else ObjectId(token)
        logger.info(f"Current user ID: {user_id}")

        # Find the blog review
        blog_review = db["blog_reviews"].find_one({"_id": ObjectId(review_id)})

        if not blog_review:
            raise HTTPException(status_code=404, detail="Review not found")

        # Ensure the index is valid
        if index < 0 or index >= len(blog_review.get("replies", [])):
            raise HTTPException(status_code=404, detail="Reply index out of range")

        # Get the reply at the specified index
        reply_data = blog_review["replies"][index]
        # Check permissions
        is_reply_owner = reply_data["user_id"] == user_id
        has_admin_rights = is_admin(user_id)
        if not is_reply_owner and not has_admin_rights:
            logger.error(f"Permission denied. Reply user_id: {reply_data['user_id']}, Current user_id: {user_id}")
            raise HTTPException(status_code=403, detail="You do not have permission to update this reply")
        # Remove the reply from the list
        del blog_review["replies"][index]
        db["blog_reviews"].update_one({"_id": ObjectId(review_id)}, {"$set": {"replies": blog_review["replies"]}})

        return JSONResponse(content={"message": "Reply deleted successfully."})

    except Exception as e:
        logger.error(f"Failed to delete reply: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete reply")

# Helper function to check if the user is an admin (adjust as necessary)
def is_admin(user_id: str) -> bool:
    # Implement your logic to check if the user is an admin
    return