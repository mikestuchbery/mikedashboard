import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, ListTodo } from 'lucide-react';
import { Task } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('focus-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('focus-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: input.trim(),
      status: 'daily',
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'daily' : 'completed' } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col h-full max-h-[500px]">
      <div className="flex items-center gap-2 mb-6">
        <ListTodo className="w-5 h-5 text-white/70" />
        <h2 className="text-lg font-medium text-white">Focus Tasks</h2>
      </div>

      <form onSubmit={addTask} className="relative mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a focus task..."
          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-black rounded-lg hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  task.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-white/30'
                }`}
              >
                {task.status === 'completed' && <Check className="w-3 h-3 text-white" />}
              </button>
              <span className={`flex-1 text-sm text-white/90 ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-white/40 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="text-center py-10 text-white/30 text-sm italic">
            No tasks for this session.
          </div>
        )}
      </div>
    </div>
  );
};
