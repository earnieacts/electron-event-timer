import React, { useState, useRef, useEffect } from 'react';

interface TimePickerProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, max, label }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);
  const [translateY, setTranslateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentValue(value);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const delta = startY - e.clientY;
    setTranslateY(delta);
    
    if (Math.abs(delta) >= 30) {
      const steps = Math.floor(Math.abs(delta) / 30);
      const direction = delta > 0 ? 1 : -1;
      let newValue = currentValue + (direction * steps);
      
      // Circular scrolling
      if (newValue < 0) newValue = max;
      if (newValue > max) newValue = 0;
      
      onChange(newValue);
      setStartY(e.clientY);
      setTranslateY(0);
      setCurrentValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTranslateY(0);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove as any);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, [isDragging, currentValue]);

  const getDisplayNumbers = (currentValue: number) => {
    const numbers = [];
    for (let i = -3; i <= 3; i++) {
      let num = currentValue + i;
      if (num < 0) num = max + num + 1;
      if (num > max) num = num - max - 1;
      numbers.push(num);
    }
    return numbers;
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-400 text-sm mb-2">{label}</label>
      <div className="relative w-20 h-[180px] overflow-hidden">
        <div 
          ref={containerRef}
          className="absolute inset-0 flex flex-col items-center cursor-ns-resize"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translateY(${translateY}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 pointer-events-none z-10" />
          {getDisplayNumbers(value).map((num, index) => (
            <div
              key={index}
              className={`h-[60px] flex items-center justify-center transition-all duration-200 ${
                index === 3
                  ? 'text-white text-4xl font-bold'
                  : `text-gray-600 text-2xl opacity-${30 - Math.abs(index - 3) * 5}`
              }`}
            >
              {num.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            let newValue = parseInt(e.target.value);
            if (isNaN(newValue)) newValue = 0;
            if (newValue < 0) newValue = max;
            if (newValue > max) newValue = 0;
            onChange(newValue);
          }}
          className="absolute opacity-0 w-full h-full cursor-ns-resize"
          min="0"
          max={max}
        />
      </div>
    </div>
  );
};