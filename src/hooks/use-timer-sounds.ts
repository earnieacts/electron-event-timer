import { useCallback, useRef, useState } from 'react';

export function useTimerSounds() {
  const timerSound = useRef(new Audio('/assets/sounds/timer.mp3'));
  const lastSecondsSound = useRef(new Audio('/assets/sounds/last-seconds.mp3'));
  const countdownSound = useRef(new Audio('/assets/sounds/3-2-1.mp3'));
  const finalSound = useRef(new Audio('/assets/sounds/final.mp3'));
  
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const playSound = useCallback(async (audio: HTMLAudioElement) => {
    try {
      if (audio.paused) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Ignore abort errors from pause interruptions
        return;
      }
      console.error('Error playing sound:', error);
    }
  }, []);

  const stopAllSounds = useCallback(() => {
    timerSound.current.pause();
    timerSound.current.currentTime = 0;
    lastSecondsSound.current.pause();
    lastSecondsSound.current.currentTime = 0;
    countdownSound.current.pause();
    countdownSound.current.currentTime = 0;
    finalSound.current.pause();
    finalSound.current.currentTime = 0;
  }, []);

  const playTimerSound = useCallback(() => {
    stopAllSounds();
    playSound(timerSound.current);
  }, [stopAllSounds]);

  const playLastSecondsSound = useCallback(() => {
    stopAllSounds();
    playSound(lastSecondsSound.current);
  }, [stopAllSounds]);

  const playCountdownSound = useCallback(() => {
    playSound(countdownSound.current);
  }, []);

  const playFinalSound = useCallback(() => {
    stopAllSounds();
    playSound(finalSound.current);
  }, [stopAllSounds]);

  const startWithCountdown = useCallback((onCountdownComplete: () => void) => {
    setIsCountdownVisible(true);
    setTimeout(() => {
      setIsCountdownVisible(false);
      onCountdownComplete();
    }, 4000);
  }, []);

  return {
    playTimerSound,
    playLastSecondsSound,
    playCountdownSound,
    playFinalSound,
    stopAllSounds,
    startWithCountdown,
    isCountdownVisible,
    setIsCountdownVisible
  };
} 