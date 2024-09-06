import create from 'zustand';

import { Task } from '../taskTypes';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setTasks: (tasks: Task[]) => set({ tasks }),
}));
