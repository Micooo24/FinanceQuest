from fastapi import APIRouter, HTTPException
import logging
import json
import httpx
from datetime import datetime, timezone
from config.db import db
from config.groq import GROQ_API_KEY
from models.miniInvesting_analysis import miniInvestment_analysis
from models.miniInvesting import UserAnswers, Answer
import re
from bson import ObjectId

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FIXED ROUTE FOR AI ITSELF
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# TO AVOID SPECIAL CHARACTERS
def sanitize_string(value):
    """Remove special characters from a string."""
    return re.sub(r'[^\w\s]', '', value)

# Convert ObjectId and datetime to string
def convert_to_string(data):
    if isinstance(data, dict):
        return {key: convert_to_string(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_to_string(item) for item in data]
    elif isinstance(data, ObjectId):
        return str(data)
    elif isinstance(data, datetime):
        return data.isoformat()
    else:
        return data

@router.post("/analyze-miniInvest/{user_id}")
async def analyze_miniInvest(user_id: str):
    """Process AI mini-invest analysis and store result"""
    try:
        # Fetch the latest ObjectId for the user_id
        latest_entry = db.miniInvesting.find_one({"user_id": user_id}, sort=[("_id", -1)])
        if not latest_entry:
            logger.warning(f"No miniInvestment data found for user {user_id}")
            raise HTTPException(status_code=404, detail="No miniInvestment data found")
        
        # Ensure answers are formatted correctly
        if "answers" in latest_entry:
            for answer in latest_entry["answers"]:
                answer["selected_index"] = int(answer.get("selected_index", 0))
                answer["is_correct"] = bool(answer.get("is_correct", False))

        # Convert to UserAnswers model
        user_answers = UserAnswers(**latest_entry)

        # Convert to a properly formatted string (avoid redundant logging)
        latest_entry = convert_to_string(user_answers.dict())
        formatted_data = json.dumps(latest_entry, indent=2)

        # Construct AI prompt
        prompt = f"""
        Here is the user's miniInvest data:
        {formatted_data}

        ALL DATA PROVIDED ARE NON-EXISTENT AND FOR EDUCATIONAL PURPOSES ONLY.
        
        Provide 5 sentences, First is the introduction containing the user's performance, Second is the user's strengths, Third is the user's weaknesses, Fourth is the suggestion for improvements and fifth is the what and who to contact for further assistance.
        """
        
        # logger.info(f"AI Prompt: {prompt}")  # Log the AI prompt
        
        # Send request to AI
        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
        }

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(GROQ_API_URL, json=data, headers=headers)

        if response.status_code != 200:
            logger.error(f"AI analysis failed: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Failed to get AI analysis")

        # Extract AI response
        ai_response = response.json()
        analysis = ai_response["choices"][0]["message"]["content"]
        
        logger.info(f"AI Response Received: {analysis}")  # Debugging step

        # Save AI response to MongoDB
        ai_feedback = miniInvestment_analysis(
            user_id=user_id,
            analysis=analysis,
            created_at=datetime.now(timezone.utc)
        )

        insert_result = db.miniInvest_analysis.insert_one(ai_feedback.dict())
        if not insert_result.inserted_id:
            logger.error(f"Failed to insert AI analysis for user {user_id}")
            raise HTTPException(status_code=500, detail="Failed to save AI analysis to database")

        return {"analysis": analysis}

    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")
    
# CREATE AI RESPONSE TO DATABASE
@router.get("/get-miniInvest-analysis/{user_id}")
async def get_miniInvest_analysis(user_id: str):
    """Fetch the latest AI miniInvest analysis for a specific user"""
    try:
        analysis = db.miniInvest_analysis.find({"user_id": user_id}).sort("created_at", -1).limit(1)
        analysis = list(analysis)  
        if not analysis:
            logger.warning(f"No analysis found for user {user_id}")
            raise HTTPException(status_code=404, detail="No analysis found")
        
        return {"analysis": analysis[0]["analysis"]}
    except Exception as e:
        logger.error(f"Error fetching analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching analysis")