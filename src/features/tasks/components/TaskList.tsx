import { FiAlertCircle } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

import TaskItem from './TaskItem'
import { useTaskStore } from '../stores/useTaskStore'

const TaskList: React.FC = () => {
  const { fetchTasks } = useTaskStore()
  const tasks = useTaskStore((state) => state.tasks)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true)
        await fetchTasks()
      } catch (err) {
        setError('Failed to load tasks. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [fetchTasks])

  if (isLoading) {
    return (
      <Skeleton className='h-[200px] rounded-lg p-4 space-y-4 mx-4 md:mx-6 lg:mx-8' />
    )
  }

  if (error) {
    return (
      <Alert className='w-auto p-4 mx-4 md:mx-6 lg:mx-16 bg-red-100 border-red-400 text-red-700'>
        <FiAlertCircle className='w-5 h-5 mr-3 text-red-700' />

        <AlertTitle>Error!</AlertTitle>

        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!tasks.length) {
    return (
      <p className='text-gray-500 space-y-6 p-4 md:p-6 lg:p-8'>
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
