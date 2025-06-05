import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Pause, RotateCcw, Play, X } from 'lucide-react';
import { type Task } from '../../db/pomodoro-db';
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer.ts';

interface Props {
  task: Task;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onReset: () => void;
}

export default function CenterCard({
  task,
  onStart,
  onPause,
  onResume,
  onCancel,
  onReset,
}: Props) {
  const { secondsRemaining, isActive, start, pause, resume, reset } =
    usePomodoroTimer(task.remainingTime * 60, () => {
      console.log('一个番茄钟完成 ✅');
    });

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleReset = () => {
    onReset();
  };

  const handleStart = () => {
    start();
    onStart();
  };

  const handlePause = () => {
    pause();
    // onPause();
  };

  const handleResume = () => {
    onResume();
  };

  const handleCancel = () => {
    onCancel();
  };

  const getActionButton = () => {
    switch (task.status) {
      case 'active':
        return (
          <Button onClick={handlePause} className='action-btn'>
            <Pause className='mr-2 h-4 w-4' />
            暂停
          </Button>
        );
      case 'paused':
        return (
          <Button onClick={handleResume} className='action-btn'>
            <Play className='mr-2 h-4 w-4' />
            继续
          </Button>
        );
      default:
        return (
          <Button onClick={handleStart} className='action-btn'>
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
          当前任务：<span className='font-semibold'>{task.taskName}</span>
        </p>
        <div className='flex gap-4'>
          {getActionButton()}
          <Button
            variant='outline'
            className='action-btn'
            onClick={handleCancel}
            disabled={
              task.status === 'completed' || task.status === 'cancelled'
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
