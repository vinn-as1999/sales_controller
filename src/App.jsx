import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const [isToken, setIsToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login isToken={isToken} setIsToken={setIsToken} />} path='/' />
          <Route element={<Home isToken={isToken} setIsToken={setIsToken} />} path='/home' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
