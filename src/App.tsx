import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import TaskPage from './features/tasks/pages/TaskPage'
import Footer from './shared/components/layout/Footer'
import Header from './shared/components/layout/Header'
import { Toaster } from './shared/components/ui/toaster'

const App: React.FC = () => {
  return (
    <>
      <Header />

      <div className='pb-16'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tasks' element={<TaskPage />} />
          </Routes>
        </BrowserRouter>

        <Toaster />
      </div>
      <Footer />
    </>
  )
}

export default App
