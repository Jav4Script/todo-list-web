import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

import TaskItem from './TaskItem'
import { useGetTasks } from '../hooks/useGetTasks'
import { useTaskStore } from '../stores/useTaskStore'

const TaskList: React.FC = () => {
  const { isError, isLoading } = useGetTasks()
  const tasks = useTaskStore((state) => state.tasks)

  console.log('tasks', tasks)

  if (isLoading) {
    return (
      <Skeleton
        data-testid='task-list-skeleton'
        className='h-[200px] rounded-lg p-4 space-y-4 mx-4 md:mx-6 lg:mx-8'
      />
    )
  }

  if (isError) {
    return (
      <Alert
        data-testid='task-list-error'
        className='w-auto p-4 mx-4 md:mx-6 lg:mx-16 bg-red-100 border-red-400 text-red-700'
      >
        <FiAlertCircle className='w-5 h-5 mr-3 text-red-700' />

        <AlertTitle>Error!</AlertTitle>

        <AlertDescription>
          Failed to load tasks. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  if (!tasks || !tasks.length) {
    return (
      <p
        data-testid='task-list-empty'
        className='text-gray-500 space-y-6 p-4 md:p-6 lg:p-8'
      >
        No tasks available.
      </p>
    )
  }

  return (
    <Card className='p-4 space-y-4 mx-4 md:mx-6 lg:mx-8'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Card>
  )
}

export default TaskList
