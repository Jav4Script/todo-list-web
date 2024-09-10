import { combine } from 'zustand/middleware'

import { useTaskStore } from '../features/tasks/stores/useTaskStore'

const rootStore = combine(useTaskStore, () => ({
  useTaskStore,
}))

export default rootStore

// Root store configuration for state management
// Uses Zustand for lightweight and efficient state management
