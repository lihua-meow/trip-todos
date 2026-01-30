
import { TripInput, TripPlan } from "~/frontend/types";

// When running locally, this points to your FastAPI server
const BACKEND_URL = 'http://localhost:8000/api/plan';

export const generateTripPlan = async (input: TripInput): Promise<TripPlan> => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch trip plan from backend');
    }

    const data = await response.json();
    
    // Ensure steps have the completed property for the frontend state
    return {
      ...data,
      steps: data.steps.map((s: any) => ({ 
        ...s, 
        id: s.id || Math.random().toString(36).substr(2, 9),
        completed: false 
      }))
    };
  } catch (error) {
    console.error("Backend communication error:", error);
    throw error;
  }
};
