import { HttpStatusCode } from 'axios'
import { http, HttpResponse } from 'msw'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { customRender } from '@/shared/utils/tests-utils'
import { API_URL, server } from '@/shared/mocks/tasks'

import TaskItem from './TaskItem'

describe('TaskItem', () => {
  const task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
  }

  test('renders TaskItem', () => {
    customRender(<TaskItem task={task} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('handles editing a task', async () => {
    server.use(
      http.put(`${API_URL}/${task.id}`, (): HttpResponse => {
        return HttpResponse.json(
          {
            ...task,
            title: 'Updated Task',
            description: 'Updated Description',
          },
          { status: HttpStatusCode.Ok }
        )
      })
    )

    customRender(<TaskItem task={task} />)

    fireEvent.click(screen.getByRole('button', { name: /edit/i }))

    fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
      target: { value: 'Updated Title' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
      target: { value: 'Updated Description' },
    })

    fireEvent.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByDisplayValue('Updated Title')).toBeInTheDocument()
      expect(
        screen.getByDisplayValue('Updated Description')
      ).toBeInTheDocument()
    })
  })

  test('handles delete error gracefully', async () => {
    console.error = vi.fn() // Mock console.error to suppress error output in test

    server.use(
      http.delete(`${API_URL}/${task.id}`, (): HttpResponse => {
        return HttpResponse.json(undefined, {
          status: HttpStatusCode.InternalServerError,
        })
      })
    )

    customRender(<TaskItem task={task} />)

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))

    await screen.findByText(/failed to delete task/i)
  })

  test('handles deleting a task', async () => {
    server.use(
      http.delete(`${API_URL}/${task.id}`, (): HttpResponse => {
        return HttpResponse.json(undefined, {
          status: HttpStatusCode.NoContent,
        })
      })
    )

    customRender(<TaskItem task={task} />)

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.getByText('Task deleted successfully.')).toBeInTheDocument()
    })
  })
})
