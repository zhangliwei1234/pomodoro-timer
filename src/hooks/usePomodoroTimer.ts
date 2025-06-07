import { useEffect, useRef, useState } from 'react';

/**
 * Pomodoro 倒计时 Hook
 * @param initialSeconds 初始时间（秒）
 * @param onFinish 倒计时结束回调
 */
export const usePomodoroTimer = (
  initialSeconds: number,
  onFinish: () => void,
) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsRemaining(initialSeconds);
  }, [initialSeconds]);

  // 启动倒计时
  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setIsActive(true);
    timerRef.current = window.setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsActive(false);
          onFinish(); // 执行完成回调
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 暂停
  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
  };

  // 继续
  const resume = () => {
    if (!isActive && secondsRemaining > 0) {
      start();
    }
  };

  // 重置
  const reset = (newSeconds: number = initialSeconds) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
    setSecondsRemaining(newSeconds);
  };

  // 清理副作用
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    secondsRemaining,
    start,
    pause,
    resume,
    reset,
  };
};
