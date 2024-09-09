import { create } from 'zustand'

import { getTasks } from '../services/taskService'
import { Task } from '../taskTypes'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  getTasks: () => void
  removeTask: (taskId: string) => void
  setTasks: (tasks: Task[]) => void
  updateTask: (updatedTask: Task) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  getTasks: async () => {
    const tasks = await getTasks()
    set({ tasks })
  },
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setTasks: (tasks) => set({ tasks }),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
}))
