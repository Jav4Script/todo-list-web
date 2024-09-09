import { act, renderHook } from '@testing-library/react-hooks'
import { beforeEach, describe, expect, vi, test } from 'vitest'

import { useTaskStore } from './useTaskStore'
import { Task } from '../taskTypes'

const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', description: 'Description 1' },
  { id: '2', title: 'Task 2', description: 'Description 2' },
]

describe('useTaskStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initial state is correct', () => {
    const { result } = renderHook(() => useTaskStore())
    expect(result.current.tasks).toEqual([])
  })

  test('addTask adds a task', () => {
    const { result } = renderHook(() => useTaskStore())
    act(() => {
      result.current.addTask(mockTasks[0])
    })
    expect(result.current.tasks).toEqual([mockTasks[0]])
  })

  test('getTasks fetches tasks and updates state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTaskStore())

    act(() => {
      result.current.getTasks()
    })

    await waitForNextUpdate()

    expect(result.current.tasks).toEqual(mockTasks)
  })

  test('removeTask removes a task', () => {
    const { result } = renderHook(() => useTaskStore())
    act(() => {
      result.current.setTasks(mockTasks)
    })
    act(() => {
      result.current.removeTask('1')
    })
    expect(result.current.tasks).toEqual([mockTasks[1]])
  })

  test('updateTask updates a task', () => {
    const { result } = renderHook(() => useTaskStore())
    const updatedTask = { ...mockTasks[0], title: 'Updated Task' }
    act(() => {
      result.current.setTasks(mockTasks)
    })
    act(() => {
      result.current.updateTask(updatedTask)
    })
    expect(result.current.tasks).toEqual([updatedTask, mockTasks[1]])
  })
})
