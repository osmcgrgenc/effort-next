import { useEffect, useState } from 'react';
import { formatDuration } from '@/utils/timeUtils';

interface TimerProps {
  isRunning: boolean;
  startTime: number | null;
  duration: number;
}

export const Timer: React.FC<TimerProps> = ({ isRunning, startTime, duration }) => {
  const [currentTime, setCurrentTime] = useState<number>(duration);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && startTime) {
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setCurrentTime(duration + elapsed);
      }, 1000);
    } else {
      setCurrentTime(duration);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, startTime, duration]);

  const [hours, minutes, seconds] = formatDuration(currentTime).split(':');

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col items-center">
        <div className="text-5xl font-light">{hours}</div>
        <div className="text-xs text-gray-500 mt-1">Saat</div>
      </div>
      <div className="text-4xl font-light text-gray-400 mb-5">:</div>
      <div className="flex flex-col items-center">
        <div className="text-5xl font-light">{minutes}</div>
        <div className="text-xs text-gray-500 mt-1">Dakika</div>
      </div>
      <div className="text-4xl font-light text-gray-400 mb-5">:</div>
      <div className="flex flex-col items-center">
        <div className="text-5xl font-light">{seconds}</div>
        <div className="text-xs text-gray-500 mt-1">Saniye</div>
      </div>
    </div>
  );
}; 