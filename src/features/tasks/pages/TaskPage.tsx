import React from 'react'

import TaskForm from '@/features/tasks/components/TaskForm'
import TaskList from '@/features/tasks/components/TaskList'

import { useCreateTask } from '../hooks/useCreateTask'

const TaskPage: React.FC = () => {
  const { mutateAsync: createTask } = useCreateTask()

  const handleAddTask = async (data: {
    title: string
    description: string
  }) => {
    try {
      await createTask(data)
    } catch (err) {
      console.error('Failed to add task:', err)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList />
    </div>
  )
}

export default TaskPage

// Task page component
// Adheres to the Single Responsibility Principle by focusing solely on rendering the task page
