from fastapi import APIRouter, HTTPException
import logging
import json
import httpx
from datetime import datetime
from config.db import db
from config.groq import GROQ_API_KEY
from models.minibudget_analysis import minibudget_analysis
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

#POST PROMPT TO AI FOR ANALYSIS
@router.post("/analyze-minibudget/{user_id}")
async def analyze_minibudget(user_id: str):
    """Process AI minibudget analysis and store result"""
    # Fetch minibudget data
    try:
        minibudget_data = db.minibudget.find_one({"user_id": user_id}, sort=[("started_at", -1)])
        if not minibudget_data:
            logger.warning(f"No minibudget data found for user {user_id}")
            raise HTTPException(status_code=404, detail="No minibudget data found")
    except Exception as e:
        logger.error(f"Error fetching minibudget data: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching minibudget data")

    # Format data for AI
    def convert_to_string(data):
        if isinstance(data, dict):
            return {key: convert_to_string(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [convert_to_string(item) for item in data]
        else:
            return str(data)

    formatted_data = json.dumps(convert_to_string(minibudget_data), indent=2)

    # AI prompt
    prompt = f"""
    Here is your minibudget data:
    {formatted_data}
    
    ALL DATA PROVIDED ARE NON EXISTENT AND FOR EDUCATIONAL PURPOSES ONLY. Provide a detailed diagnosis in 3 sentences discussing their financial behaviour and suggestion for improvement then use Linear Progression.
    first sentence include the firstweek to fourthweek progress then on the second sentence is the use of savings strategies and techniques, also discuss about the average that average is the average spending per week, and then lastly
    suggest some improvements. IF YOU ARE TO DISPLAY THE MONEY, MAKE SURE YOU USE PHILIPPINE PERO CURRENCY SIGN
    """
    
    # Call AI API
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(GROQ_API_URL, json=data, headers=headers)

        if response.status_code != 200:
            logger.error(f"AI analysis failed: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Failed to get AI analysis")

        # Extract AI response
        ai_response = response.json()
        analysis = ai_response["choices"][0]["message"]["content"]

        # logger.info(f"AI Response Received: {analysis}") 

        # Save AI response to MongoDB
        ai_feedback = minibudget_analysis(
            user_id=user_id,
            analysis=analysis,
            created_at=datetime.utcnow()
        )

        insert_result = db.minibudget_analysis.insert_one(ai_feedback.dict())
        if not insert_result.inserted_id:
            logger.error(f"Failed to insert AI analysis for user {user_id}")
            raise HTTPException(status_code=500, detail="Failed to save AI analysis to database")

        # logger.info(f"AI analysis stored in MongoDB with ID: {insert_result.inserted_id}")
        return {"analysis": analysis}

    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")
    
#CREATE AI RESPONSE TO DATABASE
@router.get("/get-minibudget-analysis/{user_id}")
async def get_minibudget_analysis(user_id: str):
    """Fetch the latest AI minibudget analysis for a specific user"""
    try:
        analysis = db.minibudget_analysis.find({"user_id": user_id}).sort("created_at", -1).limit(1)
        analysis = list(analysis)  
        if not analysis:
            logger.warning(f"No analysis found for user {user_id}")
            raise HTTPException(status_code=404, detail="No analysis found")
        
        return {"analysis": analysis[0]["analysis"]}
    except Exception as e:
        logger.error(f"Error fetching analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching analysis")
