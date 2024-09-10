import { useQuery } from 'react-query'

import { getTask } from '../services/taskService'

export const useGetTask = (taskId: string) => {
  return useQuery(['task', taskId], () => getTask(taskId))
}

// Custom hook for fetching a single task
// Encapsulates the logic for data fetching, adhering to the DRY principle
