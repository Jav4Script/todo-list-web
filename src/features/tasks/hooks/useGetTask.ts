import { useQuery } from 'react-query'

import { getTask } from '../services/taskService'

export const useGetTask = (taskId: string) => {
  return useQuery(['task', taskId], () => getTask(taskId))
}
