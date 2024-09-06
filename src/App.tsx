import React from 'react'

import TaskList from './features/tasks/components/TaskList'
import TaskForm from './features/tasks/components/TaskForm'
import GlobalStyles from './styles/globalStyles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <div className='container mx-auto p-4'>
        <TaskForm />
        <TaskList />
      </div>
    </>
  )
}

export default App
