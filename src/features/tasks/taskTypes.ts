import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

export type TaskDTO = z.infer<typeof taskSchema>

export interface Task extends TaskDTO {
  id: string
}

// Root store configuration for state management
// Uses Zustand for lightweight and efficient state management
