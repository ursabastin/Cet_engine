import { useState, useEffect, useRef } from 'react';

export function useTimer(totalSeconds, onExpire, isPaused = false) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);

  // Update onExpireRef if it changes
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (isPaused || totalSeconds === null) return;

    setTimeLeft(totalSeconds);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          if (onExpireRef.current) onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [totalSeconds, isPaused]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isWarning: timeLeft < 600 // 10 minutes
  };
}
