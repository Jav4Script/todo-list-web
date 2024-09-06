import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import TaskItem from './TaskItem'
import { useTasks } from '../hooks/useTasks'
import { useTaskStore } from '../stores/useTaskStore'

const TaskList: React.FC = () => {
  const { isLoading, error } = useTasks()
  const tasks = useTaskStore((state) => state.tasks)

  if (isLoading) return <Skeleton className='w-[100px] h-[20px] rounded-full' />

  if (error)
    return (
      <Alert className='bg-red-100 border-red-400 text-red-700'>
        <FiAlertCircle className='w-5 h-5 mr-3 text-red-700' />

        <AlertTitle>Error!</AlertTitle>

        <AlertDescription>
          Unable to load tasks. Please try again later.
        </AlertDescription>
      </Alert>
    )

  return (
    <Card className='task-list'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Card>
  )
}

export default TaskList
