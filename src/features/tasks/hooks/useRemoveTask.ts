import { useMutation } from 'react-query'

import { deleteTask } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'

export const useRemoveTask = () => {
  const removeTask = useTaskStore((state) => state.removeTask)

  return useMutation(deleteTask, {
    onSuccess: (taskId) => {
      removeTask(taskId)
    },
  })
}

// Custom hook for removing tasks
// Encapsulates the logic for removing tasks, adhering to the DRY principle
