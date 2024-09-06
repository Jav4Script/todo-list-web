import { useQuery } from 'react-query';

import { fetchTasks } from '../services/taskService';
import { useTaskStore } from '../stores/useTaskStore';

export const useTasks = () => {
  const setTasks = useTaskStore((state) => state.setTasks);

  return useQuery('tasks', fetchTasks, {
    onSuccess: (data) => {
      setTasks(data);
    },
  });
};
