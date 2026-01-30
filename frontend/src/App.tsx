
import React, { useState, useCallback, useEffect } from 'react';
import { TripInput, TripPlan, TravelStyle, ActionableStep } from './types';
import { generateTripPlan } from './services/geminiService';
import Header from './components/Header';
import TripForm from './components/TripForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlanTrip = async (input: TripInput) => {
    setLoading(true);
    setError(null);
    try {
      const plan = await generateTripPlan(input);
      setTripPlan(plan);
      // Save to local storage for persistence
      localStorage.setItem('nomadPlan_current', JSON.stringify(plan));
      // Update URL with clean destination slug, duration, and style
      const slug = plan.destination
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      const styleSlug = plan.travelStyle.toLowerCase().replace(/\s+/g, '-');
      window.history.replaceState(null, '', `?destination=${slug}&duration=${plan.duration}&style=${styleSlug}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate trip plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!tripPlan) return;
    const updatedSteps = tripPlan.steps.map(s => 
      s.id === stepId ? { ...s, completed: !s.completed } : s
    );
    const updatedPlan = { ...tripPlan, steps: updatedSteps };
    setTripPlan(updatedPlan);
    localStorage.setItem('nomadPlan_current', JSON.stringify(updatedPlan));
  };

  const handleReset = () => {
    setTripPlan(null);
    localStorage.removeItem('nomadPlan_current');
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleGoHome = () => {
    handleReset();
  };

  // Hydrate from localStorage on mount only if URL has destination param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasDestination = params.has('destination');
    
    // Only load from localStorage if URL indicates a plan should be shown
    if (hasDestination) {
      const saved = localStorage.getItem('nomadPlan_current');
      if (saved) {
        try {
          const plan = JSON.parse(saved);
          setTripPlan(plan);
        } catch (e) {
          console.error("Failed to parse saved plan", e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onLogoClick={handleGoHome} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {!tripPlan && !loading && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Where to next?</h2>
              <p className="text-lg text-slate-600">Enter your details and our AI will break down your journey into actionable steps.</p>
            </div>
            <TripForm onSubmit={handlePlanTrip} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-indigo-600">✈️</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-slate-800">Plotting your course...</p>
              <p className="text-slate-500 animate-pulse">Calculating steps, mapping routes, and curating experiences.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center mb-6">
            {error}
          </div>
        )}

        {tripPlan && !loading && (
          <Dashboard 
            plan={tripPlan} 
            onToggleStep={toggleStepCompletion} 
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; 2024 NomadPlan AI. Built with Gemini 3 Flash.</p>
      </footer>
    </div>
  );
};

export default App;
