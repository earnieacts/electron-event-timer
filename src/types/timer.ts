export type TimerMode = 'simple' | 'event';

export interface TimerState {
  mode: TimerMode;
  timeLimit: number;
  currentTime: number;
  isRunning: boolean;
  rounds?: {
    current: number;
    total: number;
    timePerRound: number;
    intervalTime: number;
    isInterval: boolean;
    formattedIntervalTime?: string;
  };
} 