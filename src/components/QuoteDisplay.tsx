import React, { useState, useEffect } from 'react';
import { Quote } from '../constants';
import { getHistoricalQuotes } from '../services/gemini';
import { motion, AnimatePresence } from 'motion/react';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';

export const QuoteDisplay: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await getHistoricalQuotes();
      setQuotes(data);
    } catch (error) {
      console.error("Quote fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      }, 30000); // Rotate every 30s
      return () => clearInterval(interval);
    }
  }, [quotes]);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="relative group max-w-2xl mx-auto text-center px-6">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white/40 italic font-serif text-lg"
          >
            Summoning historical wisdom...
          </motion.div>
        ) : currentQuote ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <QuoteIcon className="w-8 h-8 text-white/20 mb-2" />
            <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed tracking-tight italic">
              "{currentQuote.text}"
            </p>
            <div className="flex flex-col items-center">
              <span className="text-white/80 font-medium tracking-widest uppercase text-xs">
                — {currentQuote.author}
              </span>
              <span className="text-white/40 text-[10px] uppercase tracking-wider mt-1">
                {currentQuote.context}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        onClick={fetchQuotes}
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-white/20 hover:text-white/60"
        title="Refresh Wisdom"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
};
