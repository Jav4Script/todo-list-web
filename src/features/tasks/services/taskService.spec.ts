import { http, HttpResponse } from 'msw'
import { HttpStatusCode } from 'axios'

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from './taskService'
import { Task, TaskDTO } from '../taskTypes'
import { mock_tasks, server } from '../../../shared/mocks/tasks'

const API_URL = '/api/tasks'

describe('taskService', () => {
  test('getTasks fetches tasks successfully', async () => {
    const result = await getTasks()
    expect(result).toEqual(mock_tasks)
  })

  test('getTask fetches a single task successfully', async () => {
    const task = mock_tasks[0]

    const result = await getTask(task.id)

    expect(result).toEqual(task)
  })

  test('createTask creates a task successfully', async () => {
    const taskData = mock_tasks[0]

    const result = await createTask(taskData)

    expect(result).toEqual(taskData)
  })

  test('updateTask updates a task successfully', async () => {
    const taskData: TaskDTO = {
      title: mock_tasks[0].title,
      description: mock_tasks[0].description,
    }
    const updatedTask: Task = { id: mock_tasks[0].id, ...taskData }

    const result = await updateTask(mock_tasks[0].id, taskData)

    expect(result).toEqual(updatedTask)
  })

  test('deleteTask deletes a task successfully', async () => {
    const result = await deleteTask('1')

    expect(result).toEqual('1')
  })

  test('handles errors correctly', async () => {
    server.use(
      http.get(`${API_URL}/:taskId`, (): HttpResponse => {
        return HttpResponse.json('Task not found', {
          status: HttpStatusCode.NotFound,
        })
      })
    )

    await expect(getTask('999')).rejects.toThrow(
      'Request failed with status code 404'
    )
  })
})
