from fastapi import APIRouter, HTTPException
import logging
import json
import httpx
from datetime import datetime
from config.db import db
from config.groq import GROQ_API_KEY
from models.analysis import FinancialAnalysis
import re
from bson import ObjectId

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def sanitize_string(value):
    """Remove special characters from a string."""
    return re.sub(r'[^\w\s]', '', value)

@router.post("/analyze/{user_id}/{year}/{month}")
async def analyze_finances(user_id: str, year: int, month: int):
    """Process AI financial analysis and store result"""
    logger.info(f"Analyzing finances for user {user_id} for {month}/{year}")

    # Fetch financial data
    try:
        records = list(db.monthly_tracker.find({"user_id": user_id, "year": int(year), "month": int(month)}).sort("started_at", -1))
        # logger.info(f"Fetched records: {records}")
    except Exception as e:
        logger.error(f"Error fetching records: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching financial data")

    if not records:
        logger.warning(f"No financial data found for user {user_id} for {month}/{year}")
        raise HTTPException(status_code=404, detail="No financial data found")

    # Format data for AI
    def convert_to_string(data):
        if isinstance(data, dict):
            return {key: convert_to_string(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [convert_to_string(item) for item in data]
        else:
            return str(data)

    formatted_records = [convert_to_string(record) for record in records]
    formatted_data = json.dumps(formatted_records, indent=2)

    # AI prompt
    prompt = f"""
    This is the finance tracking for {month}/{year}.
    
    Here is your financial data:
    {formatted_data}
    
    ALL DATA PROVIDED ARE NON EXISTENT AND FOR EDUCATIONAL PURPOSES ONLY. Provide a detailed diagnosis in 3 sentences discussing their financial behaviour and suggestion for improvement.
    """

    # logger.info(f"AI Prompt: {prompt}")  # Log the AI prompt

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

        # logger.info(f"AI API Response Status: {response.status_code}")  # Log the response status
        # logger.info(f"AI API Response Text: {response.text}")  # Log the response text

        if response.status_code != 200:
            logger.error(f"AI analysis failed: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Failed to get AI analysis")

        # Extract AI response
        ai_response = response.json()
        analysis = ai_response["choices"][0]["message"]["content"]

        logger.info(f"AI Response Received: {analysis}")  # Debugging step
        # print(f"AI Response: {analysis}")  # Console log display

        # Save AI response to MongoDB
        ai_feedback = FinancialAnalysis(
            user_id=user_id,
            year=year,
            month=month,
            analysis=analysis,
            created_at=datetime.utcnow()
        )

        insert_result = db.FinancialAnalysis.insert_one(ai_feedback.dict())
        if not insert_result.inserted_id:
            logger.error(f"Failed to insert AI analysis for user {user_id}")
            raise HTTPException(status_code=500, detail="Failed to save AI analysis to database")

        logger.info(f"AI analysis stored in MongoDB with ID: {insert_result.inserted_id}")
        return {"analysis": analysis}

    except Exception as e:
        logger.error(f"AI processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")
    
@router.get("/get-analysis/{user_id}/{year}/{month}")
async def get_analysis(user_id: str, year: int, month: int):
    """Fetch the latest AI financial analysis for a specific user and month"""
    try:
        analysis = db.FinancialAnalysis.find({"user_id": user_id, "year": year, "month": month}).sort("created_at", -1).limit(1)
        analysis = list(analysis)  # Convert cursor to list
        if not analysis:
            logger.warning(f"No analysis found for user {user_id} for {month}/{year}")
            raise HTTPException(status_code=404, detail="No analysis found")
        
        return {"analysis": analysis[0]["analysis"]}
    except Exception as e:
        logger.error(f"Error fetching analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching analysis")