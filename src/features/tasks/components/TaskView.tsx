import React from 'react'

import { Button } from '@/shared/components/ui/button'

import { Task } from '../taskTypes'

interface TaskViewProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
}

const TaskView: React.FC<TaskViewProps> = ({ task, onEdit, onDelete }) => {
  return (
    <>
      <p>{task.description}</p>
      <Button onClick={onEdit} className='mt-2'>
        Edit
      </Button>

      <Button onClick={onDelete} variant='destructive' className='mt-2 ml-2'>
        Delete
      </Button>
    </>
  )
}

export default TaskView
