from fastapi import APIRouter, HTTPException
import logging
import json
import httpx
from datetime import datetime, timezone
from config.db import db
from config.groq import GROQ_API_KEY
from models.stats import Stats
from models.stats_analysis import stats_analysis
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

@router.post("/analyze-stats/{user_id}")
async def analyze_stats(user_id: str):
    """Process AI stats analysis and store result"""
    try:
        logger.debug(f"Received user_id: {user_id}")

        # Fetch the stats for the user_id
        user_stats_data = db.stats.find_one({"user_id": ObjectId(user_id)})
        if not user_stats_data:
            logger.warning(f"No stats data found for user {user_id}")
            raise HTTPException(status_code=404, detail="No stats data found")
        
        logger.debug(f"Fetched user stats data: {user_stats_data}")

        # Convert to Stats model
        user_stats = Stats(**user_stats_data)

        # Convert to a properly formatted string (avoid redundant logging)
        user_stats_data = convert_to_string(user_stats.dict())
        logger.debug(f"Converted user stats data: {user_stats_data}")
        
        formatted_data = json.dumps(user_stats_data, indent=2)
        logger.debug(f"Formatted user stats data: {formatted_data}")

        # Construct AI prompt
        prompt = f"""
        Here is the user's stats data:
        {formatted_data}

        ALL DATA PROVIDED ARE NON-EXISTENT AND FOR EDUCATIONAL PURPOSES ONLY.
    
        Detailed Analysis of User's Financial Behavior
        1. Overview of Financial Performance
        2. Strengths:
        3. Weaknesses:
        4. Suggestions for Improvement:
        5. Actionable Recommendations:
        6. Medals Earned:
        7. Rewards and Consequences:
        8. Conclusion:
        
        NOTE IF YOU EVER TO MENTION MONEY USE PHILIPPINE PESO CURRENCY SIGN AND THEN USE PROPER TERMS LIKE QUEST 1 INSTEAD of q1_outcome,
        its Side Quest of sq and Quest for q ... for the medal just use the Bronze Medal or Silver Medal or Gold Medal not bronze_planner...
        dont send me the ###3 something, dont put hastags just do it normally, and dont put or use the location of the user its unnecessary.
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
        ai_feedback = stats_analysis(
            user_id=user_id,
            analysis=analysis,
            created_at=datetime.now(timezone.utc)
        )

        insert_result = db.stats_analysis.insert_one(ai_feedback.dict())
        if not insert_result.inserted_id:
            logger.error(f"Failed to insert AI analysis for user {user_id}")
            raise HTTPException(status_code=500, detail="Failed to save AI analysis to database")

        logger.info(f"AI analysis saved successfully for user {user_id}")  # Log successful save

        return {"analysis": analysis}

    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")
    
@router.get("/get-stats-analysis/{user_id}")
async def get_stats_analysis(user_id: str):
    """Fetch the latest AI stats analysis for a specific user"""
    try:
        analysis_cursor = db.stats_analysis.find({"user_id": user_id}).sort("created_at", -1).limit(1)
        analysis_list = list(analysis_cursor)
        if not analysis_list:
            logger.warning(f"No analysis found for user {user_id}")
            raise HTTPException(status_code=404, detail="No analysis found")
        
        analysis = analysis_list[0]
        return {"analysis": analysis["analysis"]}
    except Exception as e:
        logger.error(f"Error fetching analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching analysis")