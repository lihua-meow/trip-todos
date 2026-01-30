
export enum TravelStyle {
  ADVENTURE = 'Adventure',
  RELAXATION = 'Relaxation',
  CULTURAL = 'Cultural',
  LUXURY = 'Luxury',
  BUDGET = 'Budget',
  FAMILY = 'Family'
}

export interface ActionableStep {
  id: string;
  title: string;
  description: string;
  category: 'Booking' | 'Packing' | 'Documentation' | 'Transit' | 'Experience' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: {
    time: string;
    description: string;
    location?: string;
  }[];
}

export interface TripPlan {
  destination: string;
  duration: number;
  travelStyle: TravelStyle;
  summary: string;
  steps: ActionableStep[];
  itinerary: DayItinerary[];
}

export interface TripInput {
  destination: string;
  duration: number;
  travelStyle: TravelStyle;
  travelers: number;
}
