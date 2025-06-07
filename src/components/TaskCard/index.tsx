import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Icon } from '@iconify/react';
import { type Task } from '../../db/pomodoro-db.ts';

interface Props {
  tasksData: Task[];
  onDelete: (id: string) => void;
}

const PomodoroTaskCards = ({ tasksData, onDelete }: Props) => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  useEffect(() => {
    setTasks(tasksData);
  }, [tasksData]);

  const firstPendingIndex = tasks.findIndex(t => t.status === 'active');

  return (
    <div className='mx-auto mt-6 max-w-md space-y-5'>
      {tasks.length === 0 ? (
        <div className='py-10 text-center text-sm text-zinc-400 dark:text-zinc-500'>
          <Icon
            icon='fluent-emoji:tomato'
            width={28}
            className='mx-auto mb-2'
          />
          暂无任务，添加一个吧 🍅
        </div>
      ) : (
        tasks.map(
          (
            { id, taskName, totalPomodoros, completedPomodoros, status },
            index,
          ) => {
            const isDone = status === 'completed' || status === 'cancelled';
            const isActive = index === firstPendingIndex;
            // 是否可以删除
            const canDelete =
              index === firstPendingIndex ||
              status === 'completed' ||
              status === 'cancelled' ||
              completedPomodoros;

            return (
              <Card
                key={id}
                className={`group relative rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-md backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/70 ${isDone ? 'opacity-50' : ''} ${isActive ? 'ring-2 ring-red-500/60' : ''} `}
              >
                <button
                  onClick={() => onDelete(id)}
                  className={`absolute right-2 top-2 text-zinc-400 ${canDelete ? 'invisible' : 'visible'}`}
                  title='删除任务'
                >
                  <Icon icon='lucide:trash-2' width='16' />
                </button>

                <CardHeader className='mb-3 p-0'>
                  <CardTitle
                    className={`text-base font-medium tracking-tight ${isDone ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-white'}`}
                  >
                    {taskName}
                  </CardTitle>
                </CardHeader>

                <CardContent className='flex items-center justify-between p-0'>
                  {isDone ? (
                    <Badge
                      variant='outline'
                      className='border-zinc-300 text-xs text-zinc-500 dark:border-zinc-700'
                    >
                      {status === 'completed' ? '已完成' : '已取消'}
                    </Badge>
                  ) : (
                    <div className='flex space-x-1.5'>
                      {[...Array(totalPomodoros)].map((_, i) => (
                        <Icon
                          key={i}
                          icon='fluent-emoji:tomato'
                          width='18'
                          className={`transition-opacity duration-200 ${
                            i < completedPomodoros
                              ? 'opacity-100'
                              : 'opacity-30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          },
        )
      )}
    </div>
  );
};

export default PomodoroTaskCards;
