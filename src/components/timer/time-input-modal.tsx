import React, { useState } from 'react';
import { TimePicker } from './time-picker';

interface TimeInputModalProps {
  onSubmit: (minutes: number) => void;
  onClose: () => void;
}

const TimeInputModal: React.FC<TimeInputModalProps> = ({ onSubmit, onClose }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    if (totalMinutes > 0) {
      onSubmit(totalMinutes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg mb-4 text-center">Set Timer Duration</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 mb-6">
            <TimePicker
              value={hours}
              onChange={setHours}
              max={23}
              label="Hours"
            />
            <TimePicker
              value={minutes}
              onChange={setMinutes}
              max={59}
              label="Minutes"
            />
            <TimePicker
              value={seconds}
              onChange={setSeconds}
              max={59}
              label="Seconds"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Set Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeInputModal; 