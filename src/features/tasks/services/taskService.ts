import api from '../../../shared/services/api'
import { Task, TaskDTO } from '../taskTypes'

const API_URL = '/api/tasks'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get(API_URL)

  return data
}

export const getTask = async (taskId: string): Promise<Task> => {
  const { data } = await api.get(`${API_URL}/${taskId}`)

  return data
}

export const createTask = async (taskData: TaskDTO) => {
  const { data } = await api.post(API_URL, taskData)

  return data
}

export const updateTask = async (taskId: string, taskData: TaskDTO) => {
  const { data } = await api.put(`${API_URL}/${taskId}`, taskData)

  return data
}

export const deleteTask = async (taskId: string) => {
  await api.delete(`${API_URL}/${taskId}`)

  return taskId
}
