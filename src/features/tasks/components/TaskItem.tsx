import React, { useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { deleteTask } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'
import { Task } from '../taskTypes'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [error, setError] = useState<string | null>(null)
  const removeTask = useTaskStore((state) => state.removeTask)

  const handleDelete = async () => {
    try {
      setError(null) // Reset error state before trying to delete
      await deleteTask(task.id)
      removeTask(task.id)
    } catch (err) {
      setError('Failed to delete task. Please try again later.')
    }
  }

  return (
    <Card className='mb-4 hover:bg-gray-50 transition'>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p>{task.description}</p>

        <Button onClick={handleDelete} variant='destructive' className='mt-2'>
          Delete
        </Button>

        {error && (
          <Alert className='bg-red-100 border-red-400 text-red-700 mt-4'>
            <FiAlertCircle className='w-5 h-5 mr-3 text-red-700' />

            <AlertTitle>Error!</AlertTitle>

            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default TaskItem
