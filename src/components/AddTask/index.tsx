import { Drawer, DrawerContent } from '../ui/drawer.tsx';
import { Button } from '../ui/button.tsx';
import { Plus } from 'lucide-react';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';

type Props = {
  onAddTask: (task: { taskName: string; pomodoroCount: number }) => void;
};

const AddTask = ({ onAddTask }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const MAX_POMODOROS = 5;

  const originHeightRef = useRef(window.innerHeight);
  const scrollTopHeightValRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onAfterClose = () => {
    setIsOpen(false);
    setTaskName('');
    setPomodoroCount(0);
  };

  const solveCoverWays = () => {
    if (!inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (inputRect.bottom > windowHeight) {
      const scrollAmount = inputRect.bottom - windowHeight + 20;
      if (!scrollTopHeightValRef.current) {
        scrollTopHeightValRef.current =
          window.pageYOffset || document.documentElement.scrollTop || 0;
      }
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        solveCoverWays();
      }, 300);

      const resizeHeight = window.innerHeight;

      if (originHeightRef.current < resizeHeight) {
        if (scrollTopHeightValRef.current) {
          window.scrollTo({
            top: scrollTopHeightValRef.current,
            behavior: 'smooth',
          });
          scrollTopHeightValRef.current = 0;
        }
      }
      originHeightRef.current = resizeHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Button
        className='flex w-full items-center justify-center gap-2 rounded-xl text-base font-medium'
        onClick={() => setIsOpen(true)}
      >
        <Plus className='h-4 w-4' />
        添加任务
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm p-4'>
            <div className='space-y-5 rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-xl backdrop-blur-md transition-all dark:border-zinc-800 dark:bg-zinc-900/70'>
              <h2 className='text-xl font-semibold tracking-tight text-zinc-900 dark:text-white'>
                添加新任务
              </h2>

              <input
                ref={inputRef}
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                className={`w-full rounded-xl border px-4 py-2.5 transition-all placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400/70`}
                placeholder='请输入任务名称...'
              />

              <div className='space-y-2'>
                <label
                  htmlFor='pomodoroCount'
                  className='block text-sm font-medium text-zinc-700 dark:text-zinc-300'
                >
                  番茄数量：
                </label>
                <div
                  id='pomodoroCount'
                  role='group'
                  aria-label='番茄数量选择器'
                  className={`flex space-x-2`}
                >
                  {Array.from({ length: MAX_POMODOROS }).map((_, i) => (
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
                className='w-full rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600'
                onClick={() => {
                  if (!taskName.trim()) {
                    alert('请输入任务名称');
                    return;
                  }
                  if (pomodoroCount <= 0) {
                    alert('请选择番茄数量');
                    return;
                  }
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
