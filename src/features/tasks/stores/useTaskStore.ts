import { create } from 'zustand'

import { getTasks } from '../services/taskService'
import { Task } from '../taskTypes'

interface TaskStore {
  tasks: Task[]
  fetchTasks: () => void
  addTask: (task: Task) => void
  removeTask: (taskId: string) => void
  updateTask: (updatedTask: Task) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const tasks = await getTasks()
    set({ tasks })
  },
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
}))
