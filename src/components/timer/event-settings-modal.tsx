import React, { useState } from 'react';
import {TimePicker} from './time-picker';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [hours, minutes, seconds] = value.split(':').map(Number);

  const handleTimeChange = (type: 'hours' | 'minutes' | 'seconds', newValue: number) => {
    const timeValues = value.split(':').map(Number);
    
    switch(type) {
      case 'hours':
        timeValues[0] = newValue;
        break;
      case 'minutes':
        timeValues[1] = newValue;
        break;
      case 'seconds':
        timeValues[2] = newValue;
        break;
    }
    
    onChange(timeValues.map(v => v.toString().padStart(2, '0')).join(':'));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <TimePicker
          value={hours}
          onChange={(value) => handleTimeChange('hours', value)}
          max={23}
          label="Hours"
        />
        <TimePicker
          value={minutes}
          onChange={(value) => handleTimeChange('minutes', value)}
          max={59}
          label="Minutes"
        />
        <TimePicker
          value={seconds}
          onChange={(value) => handleTimeChange('seconds', value)}
          max={59}
          label="Seconds"
        />
      </div>
    </div>
  );
};

interface EventSettingsModalProps {
  onSubmit: (rounds: number, minutesPerRound: number, intervalSeconds: number) => void;
  onClose: () => void;
}

const EventSettingsModal: React.FC<EventSettingsModalProps> = ({ onSubmit, onClose }) => {
  const [rounds, setRounds] = useState<string>('');
  const [timePerRound, setTimePerRound] = useState<string>('00:00:00');
  const [intervalTime, setIntervalTime] = useState<string>('00:00:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedRounds = parseInt(rounds);
    const [roundHours, roundMinutes, roundSeconds] = timePerRound.split(':').map(Number);
    const [intervalHours, intervalMinutes, intervalSeconds] = intervalTime.split(':').map(Number);
    
    const totalRoundMinutes = roundHours * 60 + roundMinutes + roundSeconds / 60;
    const totalIntervalSeconds = intervalHours * 3600 + intervalMinutes * 60 + intervalSeconds;

    if (!isNaN(parsedRounds) && totalRoundMinutes > 0 && !isNaN(totalIntervalSeconds) && 
        parsedRounds > 0 && totalIntervalSeconds >= 0) {
      onSubmit(parsedRounds, totalRoundMinutes, totalIntervalSeconds);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 p-8 rounded-2xl shadow-2xl w-[480px] border border-gray-800">
        <h2 className="text-white text-2xl font-semibold mb-6">Event Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="rounds" className="text-gray-300 block mb-2 text-sm">
              Number of Rounds
            </label>
            <input
              type="number"
              id="rounds"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              min="1"
              required
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm">
              Time per Round
            </label>
            <TimeInput value={timePerRound} onChange={setTimePerRound} />
          </div>
          <div>
            <label className="text-gray-300 block mb-2 text-sm">
              Interval Time
            </label>
            <TimeInput value={intervalTime} onChange={setIntervalTime} />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-800/80 text-gray-300 rounded-lg hover:bg-gray-700/80 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500/90 text-white rounded-lg hover:bg-blue-600/90 transition-colors text-sm font-medium"
            >
              Start Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSettingsModal; 