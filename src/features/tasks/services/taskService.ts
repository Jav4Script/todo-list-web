import api from '../../../shared/services/api';
import { Task } from '../taskTypes';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};
