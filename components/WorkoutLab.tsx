import React, { useState } from 'react';
import { Card, Button, Input, Select } from './UI';
import { generateWorkout } from '../services/geminiService';
import { WorkoutPlan } from '../types';
import { BrainCircuit, Dumbbell, Clock, Zap, CheckCircle2 } from 'lucide-react';

const WorkoutLab: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [form, setForm] = useState({
    goal: 'Hypertrophy',
    time: '45 mins',
    equipment: 'Full Gym'
  });

  const handleGenerate = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const result = await generateWorkout(form.goal, form.time, form.equipment);
      setPlan(result);
    } catch (e) {
      console.error(e);
      // In a real app, use a toast
      alert("System Overload. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      {/* Controls */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <Card title="Parameters" className="h-full">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Primary Objective</label>
              <Select 
                value={form.goal}
                onChange={(e) => setForm({...form, goal: e.target.value})}
              >
                <option>Hypertrophy (Muscle Growth)</option>
                <option>Strength (Powerlifting)</option>
                <option>Endurance (Stamina)</option>
                <option>Fat Loss (Metabolic)</option>
              </Select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Time Constraints</label>
              <Select 
                 value={form.time}
                 onChange={(e) => setForm({...form, time: e.target.value})}
              >
                <option>30 Minutes (Sprint)</option>
                <option>45 Minutes (Standard)</option>
                <option>60 Minutes (Extended)</option>
                <option>90 Minutes (Marathon)</option>
              </Select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 font-medium">Available Gear</label>
              <Input 
                value={form.equipment}
                onChange={(e) => setForm({...form, equipment: e.target.value})}
                placeholder="e.g. Dumbbells only, Bodyweight..." 
              />
            </div>

            <Button 
              className="w-full mt-4 flex items-center justify-center gap-2" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <BrainCircuit className="animate-spin w-5 h-5" />
                  FORGING...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  INITIATE SEQUENCE
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      <div className="lg:col-span-8">
        {!plan && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-[#262626] border-dashed rounded-xl bg-[#0a0a0a]/50 p-12">
            <Dumbbell className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium tracking-tight">Awaiting input parameters.</p>
            <p className="text-sm">Configure the system to generate your regimen.</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-r-2 border-secondary rounded-full animate-spin reverse"></div>
            </div>
          </div>
        )}

        {plan && (
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-end justify-between border-b border-[#262626] pb-4">
                <div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{plan.title}</h2>
                  <div className="flex gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {plan.durationMinutes} MIN</span>
                    <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-primary" /> {plan.intensity.toUpperCase()} INTENSITY</span>
                  </div>
                </div>
                <Button variant="outline" className="text-xs py-2 px-4" onClick={() => setPlan(null)}>DISCARD</Button>
             </div>

             <div className="grid gap-4">
               {plan.exercises.map((ex, idx) => (
                 <div key={idx} className="bg-[#171717] border border-[#262626] p-4 rounded-lg hover:border-primary/50 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-gray-700 group-hover:text-primary transition-colors">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-lg">{ex.name}</h4>
                          <p className="text-secondary text-sm font-medium">{ex.sets} SETS × {ex.reps}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-gray-800 hover:text-green-500 cursor-pointer transition-colors" />
                    </div>
                    {ex.notes && (
                      <div className="mt-3 ml-12 pl-4 border-l-2 border-gray-800 text-gray-400 text-sm">
                        {ex.notes}
                      </div>
                    )}
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLab;