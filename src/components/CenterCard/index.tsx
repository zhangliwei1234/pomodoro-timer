import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { Pause, RotateCcw, Play, X } from 'lucide-react';
import { type Task } from '../../db/pomodoro-db';
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer';

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
  const { secondsRemaining, isActive, start, pause, resume, reset } =
    usePomodoroTimer(task.totalPomodoros * 25 * 60, () => {
      pause();
      // 可扩展：震动、提示音等
    });

  useEffect(() => {
    if (task.status === 'active' && !isActive) {
      start();
      onStart();
    } else if (task.status === 'paused') {
      pause();
      onPause();
    } else if (task.status !== 'active') {
      reset(task.remainingTime * 60);
    }
  }, [task.status, task.remainingTime]);

  const handleReset = () => {
    reset(task.totalPomodoros * 25 * 60);
    onReset();
  };

  const handleCancel = () => {
    reset(0);
    onCancel();
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const getActionButton = () => {
    if (secondsRemaining <= 0) {
      return (
        <Button onClick={handleReset} className='btn-primary'>
          <RotateCcw className='mr-2 h-4 w-4' />
          重新开始
        </Button>
      );
    }

    if (task.status === 'active') {
      return (
        <Button onClick={pause} className='btn-primary'>
          <Pause className='mr-2 h-4 w-4' />
          暂停
        </Button>
      );
    }

    if (task.status === 'paused') {
      return (
        <Button
          onClick={() => {
            resume();
            onResume();
          }}
          className='btn-primary'
        >
          <Play className='mr-2 h-4 w-4' />
          继续
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          start();
          onStart();
        }}
        className='btn-primary'
        disabled={secondsRemaining <= 0}
      >
        <Play className='mr-2 h-4 w-4' />
        开始
      </Button>
    );
  };

  return (
    <Card className='pomodoro-card'>
      <CardHeader className='text-center'>
        <CardTitle className='bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text font-mono text-7xl text-transparent dark:from-white dark:to-zinc-300'>
          {formatTime(secondsRemaining)}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col items-center space-y-4'>
        <div className='text-sm text-zinc-600 dark:text-zinc-300'>
          当前任务：<span className='font-medium'>{task.taskName}</span>
        </div>

        <div className='flex gap-4'>
          {getActionButton()}
          <Button
            variant='outline'
            onClick={handleCancel}
            disabled={
              task.status === 'completed' ||
              task.status === 'cancelled' ||
              secondsRemaining <= 0
            }
            className='btn-secondary'
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
