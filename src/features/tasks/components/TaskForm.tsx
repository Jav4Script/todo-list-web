import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useTaskStore } from '../stores/useTaskStore'
import { createTask } from '../services/taskService'

const TaskForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm()
  const addTask = useTaskStore((state) => state.addTask)

  const onSubmit = async (data: any) => {
    const newTask = await createTask(data)
    addTask(newTask)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='task-form'>
      <Input {...register('title')} placeholder='Task Title' className='mb-4' />
      <Textarea
        {...register('description')}
        placeholder='Task Description'
        className='mb-4'
      />
      <Button type='submit'>Add Task</Button>
    </Form>
  )
}

export default TaskForm
