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

import TaskForm from './TaskForm'
import TaskView from './TaskView'
import { deleteTask, updateTask } from '../services/taskService'
import { useTaskStore } from '../stores/useTaskStore'
import { Task, TaskDTO } from '../taskTypes'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { removeTask, updateTaskInStore } = useTaskStore((state) => ({
    removeTask: state.removeTask,
    updateTaskInStore: state.updateTask,
  }))

  const handleDelete = async () => {
    try {
      setError(null) // Reset error state before trying to delete
      await deleteTask(task.id)
      removeTask(task.id)
    } catch (err) {
      setError('Failed to delete task. Please try again later.')
    }
  }

  const handleSave = async (updatedFields: TaskDTO) => {
    try {
      setError(null) // Reset error state before trying to edit
      const savedTask = await updateTask(task.id, updatedFields)
      updateTaskInStore(savedTask)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update task. Please try again later.')
    }
  }

  return (
    <Card className='mb-4 hover:bg-gray-50 transition'>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Task' : task.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <TaskForm task={task} onSubmit={handleSave} />
        ) : (
          <TaskView
            task={task}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        )}

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
