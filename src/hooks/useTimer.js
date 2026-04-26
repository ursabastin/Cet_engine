import { useState, useEffect } from 'react';

export function useTimer(initialSeconds, onExpire, mockId) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (initialSeconds <= 0) {
      setIsExpired(true);
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          if (onExpire) onExpire();
          return 0;
        }
        
        const newTime = prev - 1;
        // Save to localStorage every 10 seconds for crash recovery
        if (newTime % 10 === 0 && mockId) {
          const savedStr = localStorage.getItem(`attempt_${mockId}`);
          if (savedStr) {
            try {
              const attempt = JSON.parse(savedStr);
              attempt.timeRemaining = newTime;
              localStorage.setItem(`attempt_${mockId}`, JSON.stringify(attempt));
            } catch (e) {}
          }
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, mockId]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { timeRemaining, formattedTime, isExpired };
}
