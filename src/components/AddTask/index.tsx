import { Drawer, DrawerContent } from '../ui/drawer.tsx';
import { Button } from '../ui/button.tsx';
import { Plus } from 'lucide-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';

type Props = {
  onAddTask: (task: { taskName: string; pomodoroCount: number }) => void;
};

const AddTask = ({ onAddTask }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const MAX_POMODOROS = 5;
  const onAfterClose = () => {
    setIsOpen(false);
    setTaskName('');
    setPomodoroCount(0);
  };

  return (
    <>
      <Drawer open={isOpen}>
        <Button
          className='rounded-xl w-full flex items-center justify-center gap-2 text-base font-medium'
          onClick={() => setIsOpen(true)}
        >
          <Plus className='w-4 h-4' />
          添加任务
        </Button>

        <DrawerContent>
          <div className='mx-auto w-full max-w-sm p-4'>
            <div className='bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-5 space-y-5 transition-all'>
              <h2 className='text-xl font-semibold text-zinc-900 dark:text-white tracking-tight'>
                添加新任务
              </h2>

              <input
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                className='w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-400/70 transition-all'
                placeholder='请输入任务名称...'
              />

              <div className='space-y-2'>
                <label
                  htmlFor='pomodoroCount'
                  className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'
                >
                  番茄数量：
                  {pomodoroCount}
                </label>
                <div
                  id='pomodoroCount'
                  role='group'
                  aria-label='番茄数量选择器'
                  className='flex space-x-2'
                >
                  {Array.from({
                    length: MAX_POMODOROS,
                  }).map((_, i) => (
                    <Icon
                      key={i}
                      icon='fluent-emoji:tomato'
                      width='22'
                      className={`cursor-pointer transition-opacity duration-150 ease-in-out ${
                        i < pomodoroCount ? 'opacity-100' : 'opacity-30'
                      }`}
                      onClick={() => setPomodoroCount(i + 1)}
                      aria-pressed={i < pomodoroCount}
                    />
                  ))}
                </div>
              </div>

              <Button
                className='w-full rounded-xl bg-red-500 hover:bg-red-600 transition-colors text-white text-sm font-medium py-2.5'
                onClick={() => {
                  onAddTask({
                    taskName,
                    pomodoroCount,
                  });
                  onAfterClose();
                }}
              >
                确认添加
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddTask;
