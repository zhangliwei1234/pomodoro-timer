import Dexie, { type EntityTable } from 'dexie';

interface Task {
  id: string;
  taskName: string;
  totalPomodoros: number;
  completedPomodoros: number;
  status: 'pending' | 'doning' | 'done';
}

const PomodoroDB = new Dexie('PomodoroDatabase') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
};

PomodoroDB.version(1).stores({
  tasks: 'id, taskName, totalPomodoros, completedPomodoros, status',
});

export type { Task };
export { PomodoroDB };
