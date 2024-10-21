import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Home />} path='/home' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
