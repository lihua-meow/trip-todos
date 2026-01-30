# Trip Todos - AI-Powered Travel Planning

An intelligent trip planning application that uses AI to generate actionable checklists and itineraries for your travels.

## Features

- 🤖 **AI-Powered Planning**: Uses OpenAI/Gemini API to generate detailed trip plans
- ✅ **Actionable Checklists**: Breaks down trips into specific tasks (flights, hotels, visas, packing, etc.)
- 📅 **Daily Itineraries**: Creates hour-by-hour activity schedules
- 🎯 **Smart Defaults**: Pre-configured trip durations (1, 3, 5, 7 days)
- 🌍 **Popular Destinations**: Quick-select buttons for common travel locations
- 💾 **URL Persistence**: Share trips via clean URLs (e.g., `?destination=tokyo-japan&duration=3&style=cultural`)
- 📱 **Responsive Design**: Works on desktop and mobile

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **FastAPI** (Python) for REST API
- **OpenAI API** or **Google Gemini** for AI generation
- **Pydantic** for data validation
- **CORS** enabled for local development

## Project Structure

```
trip-todos/
├── frontend/                 # React TypeScript app
│   ├── src/
│   │   ├── components/      # React components (Form, Dashboard, Header)
│   │   ├── services/        # API service calls
│   │   ├── types.ts         # TypeScript interfaces
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # FastAPI server
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py          # API routes
│   ├── requirements.txt      # Python dependencies
│   ├── pyproject.toml        # Project metadata
│   └── venv/                 # Virtual environment
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- OpenAI API key

### Installation

#### 1. Clone Repository

```bash
git clone git@github.com-lihua-meow:lihua-meow/trip-todos.git
cd trip-todos
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
```

#### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### 4. Environment Variables

Create a `.env` file in the `backend/` directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

Server runs at `http://localhost:8000`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

App runs at `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Click a destination or type your own
3. Select trip duration (1, 3, 5, or 7 days)
4. Choose a travel style (Adventure, Relaxation, Cultural, etc.)
5. Set number of travelers
6. Click "Plan My Actionable Trip"
7. View your personalized itinerary and checklist

## API Endpoints

### POST `/api/plan`

Generate a trip plan.

**Request:**
```json
{
  "destination": "Tokyo, Japan",
  "duration": 3,
  "travelStyle": "Cultural",
  "travelers": 2
}
```

**Response:**
```json
{
  "destination": "Tokyo, Japan",
  "duration": 3,
  "travelStyle": "Cultural",
  "summary": "Experience...",
  "steps": [
    {
      "id": "1",
      "title": "Book flights on JAL/ANA (Est. $600-1200 per person)",
      "description": "...",
      "category": "Booking",
      "priority": "High",
      "completed": false
    }
  ],
  "itinerary": [...]
}
```

## Customization

### Change Default Trip Duration

Edit [frontend/src/components/TripForm.tsx](frontend/src/components/TripForm.tsx#L26):

```typescript
duration: 3,  // Change to desired default
```

### Add More Destinations

Edit [frontend/src/components/TripForm.tsx](frontend/src/components/TripForm.tsx#L10):

```typescript
const popularDestinations = [
  '🗼 Paris, France',
  '🗾 Tokyo, Japan',
  // Add more...
];
```

### Change AI Model

Edit [backend/app/main.py](backend/app/main.py#L51):

```python
model="gpt-4o-mini",  # Change to your preferred model
```

## Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment: `VITE_API_URL=https://your-backend.com`

### Backend (Railway/Heroku/AWS)
1. Deploy FastAPI app
2. Set `OPENAI_API_KEY` environment variable
3. Update frontend API URL in `vite.config.ts`

## Troubleshooting

**Port 5173 already in use:**
```bash
npm run dev -- --port 5174
```

**Port 8000 already in use:**
```bash
python -m uvicorn app.main:app --port 8001
```

**Module not found errors:**
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, open a GitHub issue at [github.com/lihua-meow/trip-todos](https://github.com/lihua-meow/trip-todos)
