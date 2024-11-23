import React, { useState } from 'react';

interface EventSettingsModalProps {
  onSubmit: (rounds: number, minutesPerRound: number, intervalSeconds: number) => void;
  onClose: () => void;
}

const EventSettingsModal: React.FC<EventSettingsModalProps> = ({ onSubmit, onClose }) => {
  const [rounds, setRounds] = useState<string>('');
  const [minutesPerRound, setMinutesPerRound] = useState<string>('');
  const [intervalSeconds, setIntervalSeconds] = useState<string>('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedRounds = parseInt(rounds);
    const parsedMinutes = parseInt(minutesPerRound);
    const parsedInterval = parseInt(intervalSeconds);
    if (!isNaN(parsedRounds) && !isNaN(parsedMinutes) && !isNaN(parsedInterval) && 
        parsedRounds > 0 && parsedMinutes > 0 && parsedInterval >= 0) {
      onSubmit(parsedRounds, parsedMinutes, parsedInterval);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg mb-4">Event Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="rounds" className="text-white block mb-2">
              Number of Rounds
            </label>
            <input
              type="number"
              id="rounds"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="minutesPerRound" className="text-white block mb-2">
              Minutes per Round
            </label>
            <input
              type="number"
              id="minutesPerRound"
              value={minutesPerRound}
              onChange={(e) => setMinutesPerRound(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="intervalSeconds" className="text-white block mb-2">
              Interval Time (seconds)
            </label>
            <input
              type="number"
              id="intervalSeconds"
              value={intervalSeconds}
              onChange={(e) => setIntervalSeconds(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
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
              Start Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSettingsModal; 