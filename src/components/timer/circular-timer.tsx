import React from 'react';

interface CircularTimerProps {
  time: number;
  activity?: string;
  progress: number;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ time, activity, progress }) => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-64 h-64 select-none">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-700 dark:stroke-gray-600 fill-none"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="8"
        />
        <circle
          className="stroke-[#4CAF50] fill-none transition-all duration-300"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="8"
          strokeDasharray={`${progress} 283`}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        {activity && <div className="text-gray-900 dark:text-white text-lg mb-1">{activity}</div>}
        <div className="text-gray-900 dark:text-white text-4xl font-mono font-bold">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default CircularTimer;
