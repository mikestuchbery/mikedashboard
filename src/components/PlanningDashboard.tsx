import React, { useState, useEffect } from 'react';
import { Calendar, Target, Zap, MessageSquare, Plus, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, startOfWeek } from 'date-fns';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export const PlanningDashboard: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('mike-goals');
    return saved ? JSON.parse(saved) : [];
  });
  const [goalInput, setGoalInput] = useState('');
  const [notes, setNotes] = useState(() => localStorage.getItem('mike-notes') || '');

  useEffect(() => {
    localStorage.setItem('mike-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('mike-notes', notes);
  }, [notes]);

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalInput.trim()) return;
    setGoals([...goals, { id: crypto.randomUUID(), text: goalInput.trim(), completed: false }]);
    setGoalInput('');
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const weekStart = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Weekly Overview */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-white/70" />
            <h2 className="text-lg font-medium text-white">Weekly Overview</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              return (
                <div 
                  key={day.toString()} 
                  className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                    isToday ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-white/60'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-tighter opacity-60">
                    {format(day, 'EEE')}
                  </span>
                  <span className="text-lg font-light tracking-tighter">
                    {format(day, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-white/70" />
            <h2 className="text-lg font-medium text-white">Brain Dump / Notes</h2>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Capture thoughts, ideas, or reminders..."
            className="w-full flex-1 bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none font-serif italic text-lg leading-relaxed"
          />
        </div>
      </div>

      {/* Goals & Priorities */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-white/70" />
            <h2 className="text-lg font-medium text-white">Big Goals</h2>
          </div>
          
          <form onSubmit={addGoal} className="relative mb-4">
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="Set a new goal..."
              className="w-full bg-black/20 border border-white/10 rounded-xl py-2 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2">
            <AnimatePresence>
              {goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 group"
                >
                  <button 
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      goal.completed ? 'bg-emerald-500 border-emerald-500' : 'border-white/30'
                    }`}
                  >
                    {goal.completed && <Check className="w-2 h-2 text-white" />}
                  </button>
                  <span className={`flex-1 text-xs text-white/80 ${goal.completed ? 'line-through opacity-40' : ''}`}>
                    {goal.text}
                  </span>
                  <button onClick={() => deleteGoal(goal.id)} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-white/70" />
            <h2 className="text-lg font-medium text-white">Priority Matrix</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-[8px] uppercase font-bold text-red-400 block mb-1">Urgent</span>
              <span className="text-[10px] text-white/60 italic">Do it now</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[8px] uppercase font-bold text-blue-400 block mb-1">Important</span>
              <span className="text-[10px] text-white/60 italic">Schedule it</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
