import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/shared/components/ui/button'

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const navigateToTasks = () => {
    navigate('/tasks')
  }

  return (
    <div className='container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Home Page</h1>

      <p className='text-lg mb-4 text-center'>
        Welcome to the Todo List application!
      </p>

      <Button
        className='mt-4  px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out'
        onClick={navigateToTasks}
      >
        Go to Tasks
      </Button>
    </div>
  )
}

export default HomePage

// Home page component
// Adheres to the Single Responsibility Principle by focusing solely on rendering the home page
