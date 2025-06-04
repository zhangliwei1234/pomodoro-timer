// src/pages/Home.tsx
import Header from '../components/Header';
import CenterCard from '../components/CenterCard';
import CompletedCard from '../components/CompletedCard';
import CumulativeCard from '../components/CumulativeCard';
import AppleStackedTasks from '../components/TaskCard';
import AddTask from '../components/AddTask';
import { PomodoroDB, type Task } from '../db/pomodoro-db';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

// 新增任务
const handleAddTask = async (task: {
  taskName: string;
  pomodoroCount: number;
}) => {
  await PomodoroDB.tasks.add({
    taskName: task.taskName,
    totalPomodoros: task.pomodoroCount,
    completedPomodoros: 0,
    remainingTime: 25,
    status: 'planned',
    id: nanoid(),
  });
};

// 删除任务
const handleDeleteTask = async (id: string) => {
  await PomodoroDB.tasks.delete(id);
};

// 开始任务
const handleStartTask = async (id: string) => {
  console.log('开始任务', id);
  await PomodoroDB.tasks.update(id, {
    status: 'active',
  });
};

const Home = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const tasks = useLiveQuery(() => PomodoroDB.tasks.toArray()) || [];
  const [firstPendingIndex, setFirstPendingIndex] = useState(0);

  useEffect(() => {
    setTasksData(tasks.reverse());
  }, [tasks]);

  useEffect(() => {
    setFirstPendingIndex(
      tasksData.findIndex(t => t.status === 'planned' || t.status === 'active'),
    );
  }, [tasksData]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-50 px-4 py-8 text-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:text-white'>
      <Header />
      {/* 中心计时卡片 */}
      <CenterCard
        task={tasksData[firstPendingIndex] || {}}
        onStart={() => handleStartTask(tasksData[firstPendingIndex]?.id || '')}
      />
      {/* 添加任务按钮 */}
      <div className='mx-auto mt-8 max-w-xl'>
        <AddTask onAddTask={handleAddTask} />
      </div>
      {/* 今日统计卡片 */}
      <div className='mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4'>
        <CompletedCard />
        <CumulativeCard />
      </div>
      <AppleStackedTasks
        tasksData={tasksData}
        onDelete={handleDeleteTask}
      ></AppleStackedTasks>
    </div>
  );
};

export default Home;
