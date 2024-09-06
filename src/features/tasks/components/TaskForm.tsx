import * as z from 'zod'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useTaskStore } from '../stores/useTaskStore'
import { createTask } from '../services/taskService'
import { FiEdit, FiFileText } from 'react-icons/fi'

const taskSchema = z.object({
  title: z.string().min(1, { message: 'Task title is required' }),
  description: z.string().optional(),
})

const TaskForm: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const addTask = useTaskStore((state) => state.addTask)

  const onSubmit = async (data: any) => {
    try {
      const newTask = await createTask(data)
      addTask(newTask)
      form.reset()
    } catch (error) {
      console.error('Failed to create task', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 p-4 md:p-6 lg:p-8 mx-4 md:mx-6 lg:mx-8'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center'>
                <FiEdit className='mr-2' />
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
              <FormLabel className='flex items-center'>
                <FiFileText className='mr-2' />
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

        <Button type='submit' className='w-full md:w-auto flex items-center'>
          Add Task
        </Button>
      </form>
    </Form>
  )
}

export default TaskForm
