import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end">
      <div className="text-5xl font-light tracking-tighter text-white tabular-nums">
        {format(time, 'HH:mm:ss')}
      </div>
      <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium mt-1">
        {format(time, 'EEEE, MMMM do')}
      </div>
    </div>
  );
};
