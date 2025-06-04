import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Pause, RotateCcw, Play, X } from 'lucide-react';
import { type Task } from '../../db/pomodoro-db';

interface Props {
  task: Task;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onReset: () => void;
}

const CenterCard = ({
  task,
  onStart,
  onPause,
  onResume,
  onCancel,
  onReset,
}: Props) => {
  // 内部状态管理倒计时（秒）
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  // 格式化时间显示 (秒 → mm:ss)
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 开始倒计时
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setIsActive(true);
    onStart();

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current as number);
          setIsActive(false);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 暂停倒计时
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
    onPause();
  };

  // 继续倒计时
  const resumeTimer = () => {
    if (!isActive && secondsRemaining > 0) {
      startTimer();
      onResume();
    }
  };

  // 取消任务
  const cancelTask = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setSecondsRemaining(0);
    onCancel();
  };

  // 重置任务
  const resetTask = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setSecondsRemaining(task.totalPomodoros * 25 * 60);
    onReset();
  };

  // 当任务状态变化时处理倒计时逻辑
  useEffect(() => {
    // 当任务状态变为 active 时启动倒计时
    if (task.status === 'active' && !isActive) {
      startTimer();
    }

    // 当任务状态变为非 active 时停止倒计时
    if (task.status !== 'active' && isActive) {
      pauseTimer();
    }

    // 当任务剩余时间变化时更新内部状态
    if (task.status !== 'active') {
      setSecondsRemaining(task.remainingTime * 60);
    }
  }, [task.status, task.remainingTime]);

  // 当倒计时结束时处理任务完成
  useEffect(() => {
    if (secondsRemaining <= 0 && isActive) {
      // 完成一个番茄钟
      pauseTimer();
    }
  }, [secondsRemaining, isActive]);

  // 组件卸载时清理计时器
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 根据任务状态确定按钮行为和显示
  const getActionButton = () => {
    if (secondsRemaining <= 0) {
      return (
        <Button
          className='rounded-xl px-6 py-2 text-lg shadow-md transition hover:shadow-lg'
          onClick={resetTask}
        >
          <RotateCcw className='mr-2 h-4 w-4' />
          重新开始
        </Button>
      );
    }

    switch (task.status) {
      case 'active':
        return (
          <Button
            className='rounded-xl px-6 py-2 text-lg shadow-md transition hover:shadow-lg'
            onClick={pauseTimer}
          >
            <Pause className='mr-2 h-4 w-4' />
            暂停
          </Button>
        );

      case 'paused':
        return (
          <Button
            className='rounded-xl px-6 py-2 text-lg shadow-md transition hover:shadow-lg'
            onClick={resumeTimer}
          >
            <Play className='mr-2 h-4 w-4' />
            继续
          </Button>
        );

      default: // 'planned', 'ready', 'completed', 'cancelled'
        return (
          <Button
            className='rounded-xl px-6 py-2 text-lg shadow-md transition hover:shadow-lg'
            onClick={startTimer}
            disabled={secondsRemaining <= 0}
          >
            <Play className='mr-2 h-4 w-4' />
            开始
          </Button>
        );
    }
  };

  return (
    <Card className='mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white/50 shadow-xl backdrop-blur-lg dark:border-zinc-700 dark:bg-zinc-900/30'>
      <CardHeader className='text-center'>
        <CardTitle className='dark:to-zinc-300" bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text font-mono text-7xl tracking-widest text-transparent text-zinc-800 dark:from-white dark:text-white'>
          {formatTime(secondsRemaining)}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col items-center space-y-4'>
        <div className='flex items-center gap-2'>
          <p className='text-sm text-zinc-600 dark:text-zinc-300'>
            当前任务：<span className='font-medium'>{task.taskName}</span>
          </p>
        </div>

        <div className='flex gap-4'>
          {getActionButton()}

          {/* 取消按钮 */}
          <Button
            variant='outline'
            className='rounded-xl px-6 py-2 text-lg shadow-md transition hover:shadow-lg'
            onClick={cancelTask}
            disabled={
              task.status === 'completed' ||
              task.status === 'cancelled' ||
              secondsRemaining <= 0
            }
          >
            <X className='mr-2 h-4 w-4' />
            取消
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterCard;
