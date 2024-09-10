import React, { useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { useToast } from '@/shared/hooks/use-toast'

import TaskForm from './TaskForm'
import TaskView from './TaskView'
import { useEditTask } from '../hooks/useEditTask'
import { useRemoveTask } from '../hooks/useRemoveTask'
import { Task, TaskDTO } from '../taskTypes'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { isError: isEditError, mutateAsync: editTask } = useEditTask()
  const { isError: isRemoveError, mutateAsync: removeTask } = useRemoveTask()
  const { toast } = useToast()

  const shouldDisplayError = isEditError || isRemoveError

  const handleDelete = async () => {
    try {
      await removeTask(task.id)
      toast({
        title: 'Success!',
        description: 'Task deleted successfully.',
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = async (updatedFields: TaskDTO) => {
    try {
      await editTask({ id: task.id, updatedFields })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card className='mb-4 hover:bg-gray-50 transition'>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Task' : task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <TaskForm task={task} onSubmit={handleEdit} />
        ) : (
          <TaskView
            task={task}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}

        {shouldDisplayError && (
          <Alert className='bg-red-100 border-red-400 text-red-700 mt-4'>
            <FiAlertCircle className='w-5 h-5 mr-3 text-red-700' />

            <AlertTitle>Error!</AlertTitle>

            <AlertDescription>{`Failed to ${
              isEditError ? 'update' : 'delete'
            } task. Please try again later.`}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default TaskItem

// Task item component
// Adheres to the Single Responsibility Principle by focusing solely on rendering a task item
