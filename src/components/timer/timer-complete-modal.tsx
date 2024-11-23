import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface TimerCompleteModalProps {
  onClose: () => void;
}

const TimerCompleteModal: React.FC<TimerCompleteModalProps> = ({ onClose }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
        gravity={0.3}
      />
      <div className="bg-gray-900/90 p-8 rounded-2xl shadow-2xl border border-gray-800 text-center animate-bounce-slow">
        <h2 className="text-white text-4xl font-bold mb-4">Time's Up!</h2>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-500/90 text-white rounded-lg hover:bg-blue-600/90 transition-colors text-sm font-medium mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimerCompleteModal; 