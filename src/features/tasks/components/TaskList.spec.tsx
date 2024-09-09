import { HttpStatusCode } from 'axios'
import { delay, http, HttpResponse } from 'msw'
import { describe, expect, test } from 'vitest'

import { customRender } from '@/shared/utils/tests-utils'
import { screen, waitFor } from '@testing-library/react'

import { API_URL, mock_tasks, server } from '@/shared/mocks/tasks'

import TaskList from './TaskList'

beforeEach(() => {
  server.resetHandlers()
})

describe.skip('TaskList', () => {
  test('renders loading state', async () => {
    server.use(
      http.get(API_URL, async () => {
        await delay(1000)
      })
    )

    customRender(<TaskList />)

    expect(await screen.findByTestId('task-list-skeleton')).toBeInTheDocument()
  })

  test('renders tasks', async () => {
    server.use(
      http.get(API_URL, (): HttpResponse => {
        return HttpResponse.json(mock_tasks, { status: HttpStatusCode.Ok })
      })
    )

    customRender(<TaskList />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
    })
  })

  test('renders empty state', async () => {
    server.use(
      http.get(API_URL, (): HttpResponse => {
        return HttpResponse.json([], { status: HttpStatusCode.Ok })
      })
    )

    customRender(<TaskList />)

    expect(await screen.findByTestId('task-list-empty')).toBeInTheDocument()
  })

  test('renders error state', async () => {
    server.use(
      http.get(API_URL, (): HttpResponse => {
        return HttpResponse.json(null, {
          status: HttpStatusCode.InternalServerError,
        })
      })
    )

    customRender(<TaskList />)

    expect(await screen.findByTestId('task-list-error')).toBeInTheDocument()
  })
})
