import React from 'react'

import TaskForm from '@/features/tasks/components/TaskForm'
import TaskList from '@/features/tasks/components/TaskList'
import { createTask } from '@/features/tasks/services/taskService'
import { useTaskStore } from '@/features/tasks/stores/useTaskStore'

const TaskPage: React.FC = () => {
  const { addTask } = useTaskStore((state) => ({
    addTask: state.addTask,
  }))

  const handleAddTask = async (data: {
    title: string
    description: string
  }) => {
    try {
      const newTask = await createTask(data)
      addTask(newTask)
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
