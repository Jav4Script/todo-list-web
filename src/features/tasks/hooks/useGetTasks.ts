import { useQuery } from 'react-query'

import { getTasks } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'

export const useGetTasks = () => {
  const setTasks = useTaskStore((state) => state.setTasks)

  return useQuery('tasks', getTasks, {
    onSuccess: (data) => {
      setTasks(data)
    },
  })
}
