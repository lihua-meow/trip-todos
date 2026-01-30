
import React, { useState } from 'react';
import { TripInput, TravelStyle } from '../types';

interface TripFormProps {
  onSubmit: (input: TripInput) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const popularDestinations = [
    '🗼 Paris, France',
    '🗾 Tokyo, Japan',
    '🏖️ Bali, Indonesia',
    '🏛️ Rome, Italy',
    '🏔️ Switzerland',
    '🦁 Safari, Kenya',
    '🌮 Mexico City, Mexico',
    '🏔️ Machu Picchu, Peru'
  ];

  const [formData, setFormData] = useState<TripInput>({
    destination: '',
    duration: 3,
    travelStyle: TravelStyle.CULTURAL,
    travelers: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination) {
      onSubmit(formData);
    }
  };

  const handleDestinationClick = (destination: string) => {
    setFormData({ ...formData, destination });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Destination</label>
        <input
          required
          type="text"
          placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              type="button"
              onClick={() => handleDestinationClick(dest.split(' ').slice(1).join(' '))}
              className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all font-medium"
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Trip Duration</label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 3, 5, 7].map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => setFormData({ ...formData, duration: days })}
              className={`py-3 rounded-lg font-bold transition-all ${
                formData.duration === days
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {days} {days === 1 ? 'Day' : 'Days'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Travel Style</label>
        <select
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          value={formData.travelStyle}
          onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value as TravelStyle })}
        >
          {Object.values(TravelStyle).map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Travelers</label>
        <input
          type="number"
          min="1"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          value={formData.travelers}
          onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 active:scale-95 mt-4"
      >
        <span>Plan My Actionable Trip</span>
        <span>🚀</span>
      </button>
    </form>
  );
};

export default TripForm;
