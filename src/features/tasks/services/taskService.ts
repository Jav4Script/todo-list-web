import api from '../../../shared/services/api'
import { Task, TaskDTO } from '../taskTypes'

const API_URL = '/api/tasks'

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get(API_URL)
  return response.data
}

export const getTask = async (taskId: string): Promise<Task> => {
  const response = await api.get(`${API_URL}/${taskId}`)
  return response.data
}

export const createTask = async (taskData: TaskDTO) => {
  const response = await api.post(API_URL, taskData)
  return response.data
}

export const updateTask = async (taskId: string, taskData: TaskDTO) => {
  const response = await api.put(`${API_URL}/${taskId}`, taskData)
  return response.data
}

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`${API_URL}/${taskId}`)
  return response.data
}
