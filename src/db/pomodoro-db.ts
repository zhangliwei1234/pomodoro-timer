import Dexie, {type EntityTable} from 'dexie';

export interface Task {
    id: string;
    title: string;
    totalPomodoros: number;
    completedPomodoros: number;
    status: 'pending' | 'done';
}

const PomodoroDB = new Dexie('PomodoroDatabase') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
}

PomodoroDB.version(1).stores({
    tasks: '++id, title, totalPomodoros, completedPomodoros, status'
});

export {PomodoroDB}
