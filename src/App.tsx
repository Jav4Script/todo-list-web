import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import TaskPage from './features/tasks/pages/TaskPage'
import Footer from './shared/components/layout/Footer'
import Header from './shared/components/layout/Header'
import GlobalStyles from './styles/globalStyles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <Header />

      <div className='pb-16'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tasks' element={<TaskPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  )
}

export default App
