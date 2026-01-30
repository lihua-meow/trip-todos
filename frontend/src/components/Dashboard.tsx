
import React, { useState } from 'react';
import { TripPlan, ActionableStep } from '../types';

interface DashboardProps {
  plan: TripPlan;
  onToggleStep: (id: string) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plan, onToggleStep, onReset }) => {
  const [activeTab, setActiveTab] = useState<'todo' | 'itinerary'>('todo');

  const completedCount = plan.steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / plan.steps.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Stat Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-900">{plan.destination}</h2>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
            <span>🗓️ {plan.duration} Days</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>✨ {plan.travelStyle}</span>
          </p>
        </div>

        <div className="flex-1 max-w-md w-full px-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-tight">Trip Readiness</span>
            <span className="text-sm font-bold text-slate-600">{progressPercent}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={onReset}
          className="text-slate-400 hover:text-red-500 p-2 transition-colors"
          title="Reset Trip"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-200/50 p-1.5 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('todo')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'todo' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Action Steps
        </button>
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'itinerary' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Itinerary
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Content: List */}
        <div>
          {activeTab === 'todo' ? (
            <div className="space-y-4">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span>✅</span> Actionable Checklist
                </h3>
                <div className="space-y-4">
                  {plan.steps.map(step => (
                    <div 
                      key={step.id} 
                      onClick={() => onToggleStep(step.id)}
                      className={`group flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${step.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md shadow-sm'}`}
                    >
                      <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${step.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                        {step.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-bold transition-all ${step.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {step.title}
                          </h4>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                            step.priority === 'High' ? 'bg-red-50 text-red-600' : 
                            step.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                          }`}>
                            {step.priority}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 leading-relaxed ${step.completed ? 'text-slate-400' : 'text-slate-500'}`}>
                          {step.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            #{step.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {plan.itinerary.map((day, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                      <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                        {day.day}
                      </span>
                      {day.title}
                    </h3>
                  </div>
                  <div className="space-y-6 relative border-l-2 border-indigo-50 pl-6 ml-4">
                    {day.activities.map((act, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white shadow-sm"></div>
                        <div className="space-y-1">
                          <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{act.time}</span>
                          <p className="text-slate-800 font-medium leading-relaxed">{act.description}</p>
                          {act.location && (
                            <div className="flex items-center text-xs text-slate-400 gap-1 mt-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {act.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
