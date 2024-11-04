import React from 'react'
import { useState } from 'react'
import { ClientsProvider } from './components/contexts/ClientsContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const [isToken, setIsToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <BrowserRouter>
        <ClientsProvider>
          <Routes>
            <Route element={<Login isToken={isToken} setIsToken={setIsToken} />} path='/' />
            <Route element={<Home isToken={isToken} setIsToken={setIsToken} />} path='/home' />
          </Routes>
        </ClientsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
