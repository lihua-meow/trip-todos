import { TripInput, TripPlan } from '../types';

export async function generateTripPlan(input: TripInput): Promise<TripPlan> {
  try {
    const response = await fetch('/api/plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to generate trip plan');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw error;
  }
}
