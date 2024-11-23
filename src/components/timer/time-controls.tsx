import React, { useState } from 'react';
import { TimerMode } from '@/types/timer';
import TimeInputModal from './time-input-modal';
import EventSettingsModal from './event-settings-modal';

interface TimerButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'default';
}

const TimerButton: React.FC<TimerButtonProps> = ({ icon, label, onClick, variant = 'default' }) => {
  const baseClasses = 'px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 select-none';
  const variantClasses = {
    primary: 'bg-[#4CAF50] hover:bg-[#45a049] text-white',
    secondary: 'bg-[#2196F3] hover:bg-[#1976D2] text-white',
    default: 'bg-gray-700 hover:bg-gray-600 text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      <span className="material-icons text-xl">{icon}</span>
      {label}
    </button>
  );
};

interface TimerControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSetTime: (seconds: number) => void;
  onSetMode: (mode: TimerMode, rounds?: number, timePerRound?: number, intervalTime?: number) => void;
  isRunning: boolean;
  mode: TimerMode;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  onStart,
  onPause,
  onReset,
  onSetTime,
  onSetMode,
  isRunning,
  mode
}) => {
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showEventSettings, setShowEventSettings] = useState(false);
  
  const handleTimeSubmit = (minutes: number) => {
    onSetTime(minutes * 60);
    setShowTimeInput(false);
  };

  const handleEventSettings = (rounds: number, minutesPerRound: number, intervalSeconds: number) => {
    onSetMode('event', rounds, minutesPerRound * 60, intervalSeconds);
    setShowEventSettings(false);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2">
        {isRunning ? (
          <TimerButton icon="pause" label="Pause" variant="primary" onClick={onPause} />
        ) : (
          <TimerButton icon="play_arrow" label="Start" variant="primary" onClick={onStart} />
        )}
        <TimerButton icon="restart_alt" label="Reset" onClick={onReset} />
      </div>
      <div className="flex gap-2">
        <TimerButton 
          icon="timer" 
          label="Set Time" 
          variant={mode === 'simple' ? 'secondary' : 'default'}
          onClick={() => setShowTimeInput(true)} 
        />
        <TimerButton 
          icon="event" 
          label={mode === 'event' ? 'Normal Mode' : 'Event Mode'}
          variant={mode === 'event' ? 'secondary' : 'default'}
          onClick={() => {
            if (mode === 'event') {
              onSetMode('simple');
            } else {
              setShowEventSettings(true);
            }
          }} 
        />
      </div>
      {showTimeInput && (
        <TimeInputModal onSubmit={handleTimeSubmit} onClose={() => setShowTimeInput(false)} />
      )}
      {showEventSettings && (
        <EventSettingsModal onSubmit={handleEventSettings} onClose={() => setShowEventSettings(false)} />
      )}
    </div>
  );
};

export default TimerControls;
