import { HttpStatusCode } from 'axios'
import { http, HttpResponse } from 'msw'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { customRender } from '@/shared/utils/tests-utils'
import { API_URL, server } from '@/shared/mocks/tasks'

import TaskPage from './TaskPage'

describe('TaskPage', () => {
  test('renders TaskForm', () => {
    customRender(<TaskPage />)

    expect(
      screen.getByRole('textbox', { name: /task title/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /task description/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /back to home/i })
    ).toBeInTheDocument()
  })

  test('handles adding a new task', async () => {
    server.use(
      http.post(API_URL, (): HttpResponse => {
        return HttpResponse.json(
          { id: '3', title: 'New Task', description: 'New Description' },
          { status: HttpStatusCode.Created }
        )
      })
    )

    customRender(<TaskPage />)

    fireEvent.change(screen.getByRole('textbox', { name: /task title/i }), {
      target: { value: 'New Task' },
    })
    fireEvent.change(
      screen.getByRole('textbox', { name: /task description/i }),
      {
        target: { value: 'New Description' },
      }
    )

    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    await screen.findByText('New Task')
    await screen.findByText('New Description')
  })

  test('handles API error gracefully', async () => {
    console.error = vi.fn() // Mock console.error to suppress error output in test

    server.use(
      http.post(API_URL, (): HttpResponse => {
        return HttpResponse.error()
      })
    )

    customRender(<TaskPage />)

    fireEvent.change(screen.getByRole('textbox', { name: /task title/i }), {
      target: { value: 'New Task' },
    })
    fireEvent.change(
      screen.getByRole('textbox', { name: /task description/i }),
      {
        target: { value: 'New Description' },
      }
    )

    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Failed to add task:',
        expect.any(Error)
      )
    })
  })
})
