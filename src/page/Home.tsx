// src/pages/Home.tsx
import Header from '../components/Header';
import CenterCard from '../components/CenterCard';
import CompletedCard from '../components/CompletedCard';
import CumulativeCard from '../components/CumulativeCard';
import AppleStackedTasks from '../components/TaskCard';
import AddTask from '../components/AddTask';

// 新增任务
const handleAddTask = (task: { taskName: string; pomodoroCount: number }) => {
  console.log(task);
};

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-50 px-4 py-8 text-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:text-white'>
      <Header />

      {/* 中心计时卡片 */}
      <CenterCard />

      {/* 添加任务按钮 */}
      <div className='mx-auto mt-8 max-w-xl'>
        <AddTask onAddTask={handleAddTask} />
      </div>

      {/* 今日统计卡片 */}
      <div className='mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4'>
        <CompletedCard />
        <CumulativeCard />
      </div>

      <AppleStackedTasks></AppleStackedTasks>
    </div>
  );
};

export default Home;
