import React, { useState } from 'react';

interface TimeInputModalProps {
  onSubmit: (minutes: number) => void;
  onClose: () => void;
}

const TimeInputModal: React.FC<TimeInputModalProps> = ({ onSubmit, onClose }) => {
  const [minutes, setMinutes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedMinutes = parseInt(minutes);
    if (!isNaN(parsedMinutes) && parsedMinutes > 0) {
      onSubmit(parsedMinutes);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg mb-4">Set Timer Duration</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="minutes" className="text-white block mb-2">
              Minutes
            </label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
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
              Set Time
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeInputModal; 