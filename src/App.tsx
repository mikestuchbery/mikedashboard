/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pomodoro } from './components/Pomodoro';
import { TaskList } from './components/TaskList';
import { MusicPlayer } from './components/MusicPlayer';
import { QuoteDisplay } from './components/QuoteDisplay';
import { Clock } from './components/Clock';
import { PlanningDashboard } from './components/PlanningDashboard';
import { LANDSCAPE_COLLECTION } from './constants';
import { Maximize2, Minimize2, Palette, LayoutDashboard, Target } from 'lucide-react';

type AppMode = 'focus' | 'planning';

export default function App() {
  const [artIndex, setArtIndex] = useState(0);
  const [artLoading, setArtLoading] = useState(true);
  const [artError, setArtError] = useState(false);
  const [isFullContent, setIsFullContent] = useState(true);
  const [mode, setMode] = useState<AppMode>('focus');

  const nextArt = () => {
    setArtLoading(true);
    setArtError(false);
    setArtIndex((prev) => (prev + 1) % LANDSCAPE_COLLECTION.length);
  };

  const currentArt = LANDSCAPE_COLLECTION[artIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
      {/* Background Art Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={artIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          {/* Fallback color if image fails */}
          <div className="absolute inset-0 bg-zinc-900 z-0" />
          
          <img
            src={currentArt.url}
            alt={currentArt.title}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${artLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setArtLoading(false)}
            onError={() => {
              console.error(`Failed to load art: ${currentArt.title}`);
              setArtLoading(false);
              setArtError(true);
            }}
          />
          
          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* UI Layer */}
      <div className="relative z-20 min-h-screen flex flex-col p-8 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-start mb-12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-serif italic text-white/90 tracking-tight">
              {mode === 'focus' ? "Mike's focus dashboard" : "Mike's planning dashboard"}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Background</span>
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">
                {artError ? "View Load Failed" : currentArt.title}
              </span>
              {!artError && <span className="text-[10px] text-white/20 ml-2">— {currentArt.location}</span>}
              {artLoading && <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse ml-2" />}
            </div>
          </div>
          <Clock />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center gap-16">
          <AnimatePresence mode="wait">
            {isFullContent && (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex justify-center"
              >
                {mode === 'focus' ? (
                  <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Sidebar: Tasks */}
                    <div className="lg:col-span-3 order-2 lg:order-1">
                      <TaskList />
                    </div>

                    {/* Center: Pomodoro & Quote */}
                    <div className="lg:col-span-6 flex flex-col items-center gap-12 order-1 lg:order-2">
                      <Pomodoro />
                      <QuoteDisplay />
                    </div>

                    {/* Right Sidebar: Music */}
                    <div className="lg:col-span-3 order-3">
                      <MusicPlayer />
                    </div>
                  </div>
                ) : (
                  <PlanningDashboard />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!isFullContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <QuoteDisplay />
            </motion.div>
          )}
        </main>

        {/* Footer Controls */}
        <footer className="mt-auto flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={nextArt}
              className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full transition-all"
            >
              <Palette className="w-4 h-4 text-white/60 group-hover:text-white" />
              <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white font-bold">Change View</span>
            </button>

            <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
              <button
                onClick={() => setMode('focus')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
                  mode === 'focus' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Focus</span>
              </button>
              <button
                onClick={() => setMode('planning')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
                  mode === 'planning' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                <Target className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Planning</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsFullContent(!isFullContent)}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white transition-all"
              title={isFullContent ? "Minimal View" : "Full View"}
            >
              {isFullContent ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </footer>
      </div>

      {/* Global Styles for Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
