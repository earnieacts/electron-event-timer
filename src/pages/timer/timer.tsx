import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CircularTimer from '@/components/timer/circular-timer';
import TimerControls from '@/components/timer/time-controls';
import TimerCompleteModal from '@/components/timer/timer-complete-modal';
import CountdownModal from '@/components/timer/countdown-modal';
import { TimerState, TimerMode } from '@/types/timer';
import { useTimerSounds } from '@/hooks/use-timer-sounds';

export function Timer() {
  const [timerState, setTimerState] = useState<TimerState>({
    mode: 'simple',
    timeLimit: 300,
    currentTime: 300,
    isRunning: false,
  });
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const { 
    playTimerSound, 
    playLastSecondsSound, 
    playCountdownSound, 
    playFinalSound, 
    stopAllSounds,
    startWithCountdown,
    isCountdownVisible 
  } = useTimerSounds();

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTimerState(prev => ({ ...prev, isRunning: false }));
      stopAllSounds();
    }
  }, [intervalId, stopAllSounds]);

  const handleTimerComplete = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimerState(prev => ({ ...prev, isRunning: false }));
    playFinalSound();
    setShowCompleteModal(true);
  }, [intervalId, playFinalSound]);

  const resetTimer = useCallback(() => {
    pauseTimer();
    stopAllSounds();
    setTimerState(prev => ({
      ...prev,
      currentTime: prev.timeLimit,
      isRunning: false,
    }));
  }, [pauseTimer, stopAllSounds]);

  const handleModalClose = useCallback(() => {
    setShowCompleteModal(false);
    resetTimer();
  }, [resetTimer]);

  const initializeTimer = useCallback(() => {
    const id = setInterval(() => {
      setTimerState(prev => {
        const newTime = Math.max(0, prev.currentTime - 1);
        
        // Sound effects logic
        if (newTime > 0) {
          if (newTime <= 3) {
            playCountdownSound();
          } else if (newTime < prev.currentTime && (!prev.rounds?.isInterval)) {
            playTimerSound();
          }
        }

        // Timer complete conditions
        if (newTime === 0 && prev.isRunning) {
          if (prev.mode === 'simple') {
            handleTimerComplete();
            return { ...prev, currentTime: 0, isRunning: false };
          }
          
          if (prev.mode === 'event' && prev.rounds) {
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
            handleTimerComplete();
            return {
              ...prev,
              currentTime: 0,
              isRunning: false
            };
          }
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
  }, [handleTimerComplete, playTimerSound, playLastSecondsSound, playCountdownSound]);

  const startTimer = useCallback(() => {
    if (!timerState.isRunning) {
      startWithCountdown(() => {
        initializeTimer();
      });
    }
  }, [timerState.isRunning, startWithCountdown, initializeTimer]);

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
            {timerState.mode === 'simple' ? 'NORMAL MODE' : 'EVENT MODE'}
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
      <Footer />
      {showCompleteModal && (
        <TimerCompleteModal onClose={handleModalClose} />
      )}
      <CountdownModal 
        isOpen={isCountdownVisible}
        onComplete={() => {
          if (!timerState.isRunning) {
            initializeTimer();
          }
        }}
        playSound={!timerState.rounds?.isInterval || timerState.currentTime <= 3}
      />
    </div>
  );
}
