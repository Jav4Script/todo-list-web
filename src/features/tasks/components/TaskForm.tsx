import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shared/components/ui/form'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'

import { Task, TaskDTO, taskSchema } from '../taskTypes'

interface TaskFormProps {
  task?: Task
  onSubmit: (data: TaskDTO) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const navigate = useNavigate()

  const form = useForm<TaskDTO>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
  })

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description,
      })
    }
  }, [task, form])

  const handleClear = () => {
    form.reset({
      title: '',
      description: '',
    })
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleSubmit = (data: TaskDTO) => {
    onSubmit(data)
    handleClear()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-6 p-4 md:p-6 lg:p-8 mx-4 md:mx-6 lg:mx-8'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center font-bold text-lg text-gray-700'>
                Task Title
              </FormLabel>

              <FormControl>
                <Input
                  placeholder='Task Title'
                  {...field}
                  className='border border-gray-300 rounded-lg p-2'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center font-bold text-lg text-gray-700'>
                Task Description
              </FormLabel>

              <FormControl>
                <Textarea
                  placeholder='Task Description'
                  {...field}
                  className='border border-gray-300 rounded-lg p-2'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex space-x-4'>
          <Button type='submit'>{task ? 'Update Task' : 'Add Task'}</Button>

          <Button
            className='bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            onClick={handleClear}
            type='button'
          >
            Clear
          </Button>

          {!task && (
            <Button
              className='bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              onClick={handleBackToHome}
              type='button'
            >
              Back to Home
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export default TaskForm

// Task form component
// Adheres to the Single Responsibility Principle by focusing solely on rendering a form for tasks
