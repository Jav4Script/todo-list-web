import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import TaskView from './TaskView'
import { Task } from '../taskTypes'

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task',
}

test('renders TaskView with task details', () => {
  render(<TaskView task={mockTask} onEdit={vi.fn()} onDelete={vi.fn()} />)

  expect(screen.getByText(mockTask.description)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument()
})

test('calls onEdit when Edit button is clicked', () => {
  const onEdit = vi.fn()
  render(<TaskView task={mockTask} onEdit={onEdit} onDelete={vi.fn()} />)

  fireEvent.click(screen.getByRole('button', { name: /Edit/i }))
  expect(onEdit).toHaveBeenCalledTimes(1)
})

test('calls onDelete when Delete button is clicked', () => {
  const onDelete = vi.fn()
  render(<TaskView task={mockTask} onEdit={vi.fn()} onDelete={onDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /Delete/i }))
  expect(onDelete).toHaveBeenCalledTimes(1)
})
