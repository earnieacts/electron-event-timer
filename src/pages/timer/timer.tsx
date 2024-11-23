import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/layout/header';
import CircularTimer from '@/components/timer/circular-timer';
import TimerControls from '@/components/timer/time-controls';
import { TimerState, TimerMode } from '@/types/timer';

export function Timer() {
  const [timerState, setTimerState] = useState<TimerState>({
    mode: 'simple',
    timeLimit: 300, // 5 minutes default
    currentTime: 300,
    isRunning: false,
  });

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!timerState.isRunning) {
      const id = setInterval(() => {
        setTimerState(prev => {
          const newTime = Math.max(0, prev.currentTime - 1);
          
          // If timer reaches 0 and we're in event mode
          if (newTime === 0 && prev.mode === 'event' && prev.rounds) {
            // If we're in an interval
            if (prev.rounds.isInterval) {
              return {
                ...prev,
                currentTime: prev.rounds.timePerRound,
                isRunning: true,
                rounds: {
                  ...prev.rounds,
                  isInterval: false,
                  current: prev.rounds.current + 1
                }
              };
            }
            // If we have more rounds and interval time
            else if (prev.rounds.current < prev.rounds.total && prev.rounds.intervalTime > 0) {
              return {
                ...prev,
                currentTime: prev.rounds.intervalTime,
                isRunning: true,
                rounds: {
                  ...prev.rounds,
                  isInterval: true
                }
              };
            }
            // If we're done with all rounds or no interval
            else if (prev.rounds.current < prev.rounds.total) {
              return {
                ...prev,
                currentTime: prev.rounds.timePerRound,
                isRunning: true,
                rounds: {
                  ...prev.rounds,
                  current: prev.rounds.current + 1
                }
              };
            }
            // Event completed
            return {
              ...prev,
              currentTime: 0,
              isRunning: false
            };
          }

          return {
            ...prev,
            currentTime: newTime,
            isRunning: newTime > 0
          };
        });
      }, 1000);
      setIntervalId(id);
      setTimerState(prev => ({ ...prev, isRunning: true }));
    }
  }, [timerState.isRunning]);

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTimerState(prev => ({ ...prev, isRunning: false }));
    }
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    pauseTimer();
    setTimerState(prev => ({
      ...prev,
      currentTime: prev.timeLimit,
      isRunning: false,
    }));
  }, [pauseTimer]);

  const setTime = useCallback((seconds: number) => {
    setTimerState(prev => ({
      ...prev,
      timeLimit: seconds,
      currentTime: seconds,
    }));
  }, []);

  const setMode = useCallback((mode: TimerMode, rounds?: number, timePerRound?: number, intervalTime?: number) => {
    setTimerState(prev => {
      if (mode === 'event' && rounds && timePerRound) {
        return {
          ...prev,
          mode: 'event',
          timeLimit: timePerRound,
          currentTime: timePerRound,
          rounds: {
            current: 1,
            total: rounds,
            timePerRound: timePerRound,
            intervalTime: intervalTime || 0,
            isInterval: false
          }
        };
      }
      return {
        ...prev,
        mode: 'simple',
        rounds: undefined
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const progress = (timerState.currentTime / timerState.timeLimit) * 283;
  const activity = timerState.mode === 'event' 
    ? timerState.rounds?.isInterval 
      ? 'REST'
      : `ROUND ${timerState.rounds?.current}`
    : undefined;

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-gray-900 dark:text-white text-xl mb-8 select-none">
            EVENT TIMER
          </h1>
          <CircularTimer 
            time={timerState.currentTime} 
            activity={activity} 
            progress={progress} 
          />
          <TimerControls 
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            onSetTime={setTime}
            onSetMode={setMode}
            isRunning={timerState.isRunning}
            mode={timerState.mode}
          />
        </div>
      </main>
    </div>
  );
}
