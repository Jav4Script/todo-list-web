import { useMutation } from 'react-query'

import { updateTask } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'
import { TaskDTO } from '../taskTypes'

export const useEditTask = () => {
  const updateTaskInStore = useTaskStore((state) => state.updateTask)

  return useMutation(
    ({ id, updatedFields }: { id: string; updatedFields: TaskDTO }) =>
      updateTask(id, updatedFields),
    {
      onSuccess: (data) => {
        updateTaskInStore(data)
      },
    }
  )
}

// Custom hook for editing tasks
// Encapsulates the logic for editing tasks, adhering to the DRY principle
