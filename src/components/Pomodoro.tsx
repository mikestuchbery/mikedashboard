import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { TimerMode } from '../constants';

interface PomodoroProps {
  onModeChange?: (mode: TimerMode) => void;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ onModeChange }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const modes: Record<TimerMode, { label: string; time: number; icon: React.ReactNode }> = {
    focus: { label: 'Focus', time: 25 * 60, icon: <Brain className="w-4 h-4" /> },
    shortBreak: { label: 'Short Break', time: 5 * 60, icon: <Coffee className="w-4 h-4" /> },
    longBreak: { label: 'Long Break', time: 15 * 60, icon: <Coffee className="w-4 h-4" /> },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].time);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].time);
    setIsActive(false);
    onModeChange?.(newMode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center gap-6">
      <div className="flex gap-2 p-1 bg-black/20 rounded-full">
        {(Object.keys(modes) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              mode === m ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'
            }`}
          >
            {modes[m].label}
          </button>
        ))}
      </div>

      <div className="text-7xl font-light tracking-tighter text-white tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform shadow-xl"
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-14 h-14 flex items-center justify-center bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
