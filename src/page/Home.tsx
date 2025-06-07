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

const statusOrder = {
  planned: 0,
  active: 0,
  paused: 0,
  completed: 1,
  cancelled: 1,
};

const Home = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const tasks = useLiveQuery(() => PomodoroDB.tasks.toArray()) || [];
  const [firstPendingIndex, setFirstPendingIndex] = useState(0);

  useEffect(() => {
    setTasksData(
      tasks
        .slice() // 拷贝数组
        .sort((a, b) => {
          // 按状态权重排序，未完成排前面
          return statusOrder[a.status] - statusOrder[b.status];
        }),
    );
  }, [tasks]);

  useEffect(() => {
    setFirstPendingIndex(
      tasksData.findIndex(
        t => t.status !== 'completed' && t.status !== 'cancelled',
      ),
    );
  }, [tasksData]);

  // 新增任务
  const handleAddTask = async (task: {
    taskName: string;
    pomodoroCount: number;
  }) => {
    await PomodoroDB.tasks.add({
      taskName: task.taskName,
      totalPomodoros: task.pomodoroCount,
      completedPomodoros: 0,
      remainingTime: 0.1,
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
    await PomodoroDB.tasks.update(id, {
      status: 'active',
    });
  };

  //  暂停任务
  const handlePauseTask = async ({
    id,
    remainingTime,
  }: {
    id: string;
    remainingTime: number;
  }) => {
    await PomodoroDB.tasks.update(id, {
      status: 'paused',
      remainingTime,
    });
  };

  // 倒计时结束
  const handleFinishTask = async (id: string) => {
    if (
      tasksData[firstPendingIndex].completedPomodoros ==
      tasksData[firstPendingIndex].totalPomodoros - 1
    ) {
      await PomodoroDB.tasks.update(id, {
        status: 'completed',
        completedPomodoros: tasksData[firstPendingIndex].completedPomodoros + 1,
      });
    } else {
      await PomodoroDB.tasks.update(id, {
        status: 'planned',
        completedPomodoros: tasksData[firstPendingIndex].completedPomodoros + 1,
        remainingTime: 0.1,
      });
    }
  };

  // 取消任务
  const handleCancelTask = async (id: string) => {
    await PomodoroDB.tasks.update(id, {
      status: 'cancelled',
    });
  };

  // 计算完成的番茄数
  const completedPomodoros = tasksData.reduce(
    (acc, cur) => acc + cur.completedPomodoros,
    0,
  );

  // 计算专注的时间
  const focusTime = tasksData.reduce(
    (acc, cur) => acc + cur.completedPomodoros * cur.remainingTime,
    0,
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-50 px-4 py-8 text-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:text-white'>
      <Header status={tasksData[firstPendingIndex]?.status} />
      {/* 中心计时卡片 */}
      <CenterCard
        task={tasksData[firstPendingIndex] || {}}
        onStart={(id: string) => handleStartTask(id)}
        onPause={({
          id,
          remainingTime,
        }: {
          id: string;
          remainingTime: number;
        }) => {
          handlePauseTask({ id, remainingTime });
        }}
        onResume={(id: string) => handleStartTask(id)}
        onFinish={(id: string) => handleFinishTask(id)}
        onCancel={(id: string) => handleCancelTask(id)}
      />
      {/* 添加任务按钮 */}
      <div className='mx-auto mt-8 max-w-xl'>
        <AddTask onAddTask={handleAddTask} />
      </div>
      {/* 今日统计卡片 */}
      <div className='mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4'>
        <CompletedCard completedPomodoros={completedPomodoros} />
        <CumulativeCard focusTime={focusTime} />
      </div>
      <AppleStackedTasks
        tasksData={tasksData}
        onDelete={handleDeleteTask}
      ></AppleStackedTasks>
    </div>
  );
};

export default Home;
