import React, { useEffect, useState } from 'react';

interface CountdownModalProps {
  isOpen: boolean;
  onComplete: () => void;
  playSound?: boolean;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ isOpen, onComplete, playSound = true }) => {
  const [count, setCount] = useState<number | 'START'>(3);
  const [audio] = useState(new Audio('/assets/sounds/start-3-2-1.wav'));

  useEffect(() => {
    if (isOpen) {
      setCount(3);
      let step = 0;
      
      if (playSound) {
        audio.currentTime = 0;
        audio.play();
      }

      const interval = setInterval(() => {
        step += 1;
        if (step < 3) {
          setCount(3 - step);
        } else if (step === 3) {
          setCount('START');
        } else if (step === 4) {
          clearInterval(interval);
          setCount(3);
          setTimeout(() => {
            onComplete();
          }, 200);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        if (playSound) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    }
  }, [isOpen, onComplete, audio, playSound]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`text-white ${typeof count === 'number' ? 'text-9xl' : 'text-7xl'} font-bold animate-pulse`}>
        {count}
      </div>
    </div>
  );
};

export default CountdownModal; 