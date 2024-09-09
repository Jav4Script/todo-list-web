import { describe, expect, test, vi, Mock } from 'vitest'
import { http, HttpResponse } from 'msw'
import { HttpStatusCode } from 'axios'

import {
  customRender,
  fireEvent,
  screen,
  waitFor,
} from '@/shared/utils/tests-utils'
import { useTaskStore } from '@/features/tasks/stores/useTaskStore'
import { API_URL, server } from '@/shared/mocks/tasks'

import TaskForm from './TaskForm'

vi.mock('@/features/tasks/stores/useTaskStore')

const mockUseTaskStore = useTaskStore as unknown as Mock

describe('TaskForm', () => {
  beforeEach(() => {
    mockUseTaskStore.mockReturnValue({
      addTask: vi.fn(),
      setTasks: vi.fn(),
    })
  })

  test('renders TaskForm and submits data', async () => {
    server.use(
      http.post(API_URL, (): HttpResponse => {
        return HttpResponse.json(
          { id: '1', title: 'New Task', description: 'Task Description' },
          { status: HttpStatusCode.Created }
        )
      })
    )

    const handleSubmit = vi.fn()
    customRender(<TaskForm onSubmit={handleSubmit} />)

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/task description/i), {
      target: { value: 'Task Description' },
    })

    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task Description',
      })
    })
  })
})
