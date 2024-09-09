import { useMutation } from 'react-query'

import { createTask } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'
import { TaskDTO } from '../taskTypes'

export const useCreateTask = () => {
  const addTask = useTaskStore((state) => state.addTask)

  return useMutation((newTask: TaskDTO) => createTask(newTask), {
    onSuccess: (data) => {
      addTask(data)
    },
  })
}
