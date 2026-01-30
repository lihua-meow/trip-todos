
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class TripRequest(BaseModel):
    destination: str
    duration: int
    travelStyle: str
    travelers: int

@app.post("/api/plan")
async def plan_trip(request: TripRequest):
    prompt = f"""
    Plan a highly detailed trip to {request.destination} for {request.travelers} people 
    for {request.duration} days. The style is {request.travelStyle}. 
    
    Return a JSON object with:
    1. destination (string)
    2. duration (number)
    3. travelStyle (string)
    4. summary (string)
    5. steps (array of objects with id, title, description, category, priority)
    6. itinerary (array of objects with day, title, and activities array with time, description, location)
    
    For the steps, be VERY SPECIFIC and ACTIONABLE. Include:
    - Flight booking: List 2-3 airlines with estimated prices, best airports, booking timeframe
    - Hotels: 2-3 hotel recommendations with estimated price ranges, how to book
    - Activities/Tours: Specific tour operators, reservation deadlines, estimated costs
    - Visas & Documentation: Specific requirements for the destination
    - Packing essentials: Specific items needed for the destination/season
    - Local tips: Transportation, money exchange, language tips, cultural etiquette
    - Restaurant recommendations: 2-3 specific restaurants with price ranges
    - Insurance & safety: What insurance to get, safety precautions
    
    Make each step title specific (e.g., "Book flights on United/KLM (Est. $800-1200 per person)" instead of "Fly into airport")
    Make descriptions include concrete details like: prices, deadlines, contact info, websites, addresses where possible.
    
    Categories should be one of: Booking, Packing, Documentation, Transit, Experience, Other
    Priority should be one of: High, Medium, Low
    
    Ensure the JSON is valid and strictly follows this structure.
    """

    try:
        print(f"API Key: {os.environ.get('OPENAI_API_KEY')}")
        print(f"Prompt: {prompt}")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        result_text = response.choices[0].message.content
        print(f"Response: {result_text}")
        print(f"Response length: {len(result_text)}")
        print(f"Response type: {type(result_text)}")
        
        # Try to extract JSON if it's wrapped in markdown
        if "```json" in result_text:
            result_text = result_text.split("```json")[1].split("```")[0].strip()
        elif "```" in result_text:
            result_text = result_text.split("```")[1].split("```")[0].strip()
        
        return json.loads(result_text)
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
