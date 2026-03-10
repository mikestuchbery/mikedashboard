import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Target, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Download,
  FileText,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Task, TaskStatus } from '../constants';

export const PlanningDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('mike-kanban-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load tasks from localStorage", e);
      return [];
    }
  });
  const [taskInput, setTaskInput] = useState('');
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem('mike-strategy-notes') || '';
    } catch (e) {
      return '';
    }
  });
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

  useEffect(() => {
    localStorage.setItem('mike-kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('mike-strategy-notes', notes);
  }, [notes]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskInput.trim(),
      status: 'daily',
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const moveTask = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const exportSummary = () => {
    const summary = tasks.map(t => `[${t.status.toUpperCase()}] ${t.text}`).join('\n');
    const blob = new Blob([`Mike's Strategy Summary - ${format(new Date(), 'PPP')}\n\n${summary}\n\nNotes:\n${notes}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strategy-summary-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
  };

  const connectCalendar = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      const { url } = await res.json();
      window.open(url, 'google_auth', 'width=600,height=700');
    } catch (e) {
      console.error("Auth failed", e);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
        setIsCalendarConnected(true);
        // In a real app, you'd fetch events here
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const clearCompleted = () => {
    if (confirm("Are you sure you want to clear all completed tasks?")) {
      setTasks(tasks.filter(t => t.status !== 'completed'));
    }
  };

  const columns: { id: TaskStatus; label: string; icon: any; color: string }[] = [
    { id: 'daily', label: 'Daily Entry', icon: Plus, color: 'text-blue-400' },
    { id: 'in-progress', label: 'In Progress', icon: Clock, color: 'text-yellow-400' },
    { id: 'blocked', label: 'Blocked', icon: AlertCircle, color: 'text-red-400' },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  const weekStart = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="w-full max-w-7xl flex flex-col gap-8">
      {/* Top Bar: Calendar & Export */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">Work Calendar</span>
              <span className="text-sm text-white font-medium">
                {isCalendarConnected ? "Connected to Google" : "Not Connected"}
              </span>
            </div>
            {!isCalendarConnected ? (
              <button 
                onClick={connectCalendar}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-xs font-bold hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-3 h-3" /> Connect
              </button>
            ) : (
              <div className="flex gap-1">
                {weekDays.map(d => (
                  <div key={d.toString()} className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[8px] text-white/60">
                    {format(d, 'd')}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={clearCompleted}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium transition-all"
          >
            <Trash2 className="w-4 h-4" /> Clear Completed
          </button>
          <button 
            onClick={exportSummary}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white text-sm font-medium transition-all"
          >
            <Download className="w-4 h-4" /> Export End of Day
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <col.icon className={`w-4 h-4 ${col.color}`} />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{col.label}</h3>
              </div>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/60">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            {col.id === 'daily' && (
              <form onSubmit={addTask} className="mb-4">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="New daily task..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder:text-white/20 focus:outline-none"
                />
              </form>
            )}

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
              <AnimatePresence initial={false}>
                {tasks.filter(t => t.status === col.id).map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white/5 border border-white/5 p-3 rounded-xl hover:border-white/20 transition-all"
                  >
                    <p className="text-xs text-white/90 mb-3 leading-relaxed">{task.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {col.id !== 'daily' && (
                          <button onClick={() => moveTask(task.id, 'daily')} className="p-1 hover:bg-white/10 rounded text-white/40"><ChevronLeft className="w-3 h-3" /></button>
                        )}
                        {col.id === 'daily' && (
                          <button onClick={() => moveTask(task.id, 'in-progress')} className="p-1 hover:bg-white/10 rounded text-white/40"><ChevronRight className="w-3 h-3" /></button>
                        )}
                        {col.id === 'in-progress' && (
                          <>
                            <button onClick={() => moveTask(task.id, 'blocked')} className="p-1 hover:bg-white/10 rounded text-red-400/40"><AlertCircle className="w-3 h-3" /></button>
                            <button onClick={() => moveTask(task.id, 'completed')} className="p-1 hover:bg-white/10 rounded text-emerald-400/40"><CheckCircle2 className="w-3 h-3" /></button>
                          </>
                        )}
                        {col.id === 'blocked' && (
                          <button onClick={() => moveTask(task.id, 'in-progress')} className="p-1 hover:bg-white/10 rounded text-white/40"><Clock className="w-3 h-3" /></button>
                        )}
                      </div>
                      <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-400 transition-opacity">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Strategy Scratchpad */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-white/70" />
            <h2 className="text-xl font-medium text-white">Strategy Scratchpad</h2>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Auto-saving</span>
          </div>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Map out your long-term vision, pivot points, and strategic breakthroughs..."
          className="w-full min-h-[300px] bg-black/20 border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-colors resize-none font-serif italic text-xl leading-relaxed"
        />
      </div>
    </div>
  );
};
