import { combine } from 'zustand/middleware';

import { useTaskStore } from '../features/tasks/stores/useTaskStore';

// Combine multiple stores into a root store
const rootStore = combine(useTaskStore, () => ({
  useTaskStore,
}));

export default rootStore;
