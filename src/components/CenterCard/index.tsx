import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Pause, Play, X } from 'lucide-react';
import { type Task } from '../../db/pomodoro-db';
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer.ts';
import { useEffect } from 'react';
import playAppleStyleRewardSound from '../../utils/playSound.ts';

interface Props {
  task: Task;
  onStart: (id: string) => void;
  onPause: ({
    id,
    remainingTime,
  }: {
    id: string;
    remainingTime: number;
  }) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onFinish: (id: string) => void;
}

export default function CenterCard({
  task,
  onStart,
  onPause,
  onResume,
  onCancel,
  onFinish,
}: Props) {
  useEffect(() => {
    if (task.status === 'active') {
      start();
    }
  }, [task.status]);
  const { secondsRemaining, start, pause, resume, reset } = usePomodoroTimer(
    JSON.stringify(task) === '{}' ? 0 : task.remainingTime * 60,
    () => {
      onFinish(task.id);
      reset();
      playAppleStyleRewardSound();
    },
  );

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = (id: string) => {
    start();
    onStart(id);
  };

  const handlePause = ({
    id,
    remainingTime,
  }: {
    id: string;
    remainingTime: number;
  }) => {
    pause();
    onPause({ id, remainingTime });
  };

  const handleResume = (id: string) => {
    resume();
    onResume(id);
  };

  const handleCancel = (id: string) => {
    if (task.status === 'active') {
      alert('任务执行中不能取消');
    } else {
      onCancel(id);
    }
  };

  const getActionButton = ({
    id,
    remainingTime,
  }: {
    id: string;
    remainingTime: number;
  }) => {
    switch (task.status) {
      case 'active':
        return (
          <Button
            onClick={() => handlePause({ id, remainingTime })}
            className='action-btn'
          >
            <Pause className='mr-2 h-4 w-4' />
            暂停
          </Button>
        );
      case 'paused':
        return (
          <Button onClick={() => handleResume(id)} className='action-btn'>
            <Play className='mr-2 h-4 w-4' />
            继续
          </Button>
        );
      default:
        return (
          <Button
            onClick={() => handleStart(id)}
            className='action-btn'
            disabled={id === undefined}
          >
            <Play className='mr-2 h-4 w-4' />
            开始
          </Button>
        );
    }
  };

  return (
    <Card className='mx-auto max-w-2xl rounded-2xl border border-zinc-200 bg-white/60 shadow-xl backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/30'>
      <CardHeader className='text-center'>
        <CardTitle className='bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text font-mono text-7xl tracking-widest text-transparent text-zinc-800 dark:from-white dark:to-zinc-300 dark:text-white'>
          {formatTime(secondsRemaining)}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center space-y-6'>
        <p className='text-base text-zinc-700 dark:text-zinc-300'>
          当前任务：
          <span className='font-semibold'>
            {JSON.stringify(task) === '{}' ? '无' : task.taskName}
          </span>
        </p>
        <div className='flex gap-4'>
          {getActionButton({
            id: task.id,
            remainingTime: secondsRemaining / 60,
          })}
          <Button
            variant='outline'
            className='action-btn'
            onClick={() => handleCancel(task.id)}
            disabled={
              task.status === 'completed' ||
              task.status === 'cancelled' ||
              JSON.stringify(task) === '{}'
            }
          >
            <X className='mr-2 h-4 w-4' />
            取消
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
