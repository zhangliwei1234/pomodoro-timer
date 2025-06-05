import { useEffect, useRef, useState } from 'react';

export const usePomodoroTimer = (
  initialSeconds: number,
  onFinish: () => void,
) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(true);

    timerRef.current = window.setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsActive(false);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsActive(false);
  };

  const reset = (newSeconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setSecondsRemaining(newSeconds);
  };

  const resume = () => {
    if (!isActive && secondsRemaining > 0) {
      start();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { secondsRemaining, isActive, start, pause, resume, reset };
};
