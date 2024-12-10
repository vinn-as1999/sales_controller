import React from 'react'
import { useState } from 'react'
import { ClientsProvider } from './components/contexts/ClientsContext.jsx'
import { ProductsProvider } from './components/contexts/ProductsContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SalesProvider } from './components/contexts/SalesContext.jsx'
import Login from './pages/Login'
import Home from './pages/Home'
import Shopping from './pages/Shopping.jsx'

function App() {
  const [isToken, setIsToken] = useState(localStorage.getItem('token'));

  return (
    <>
      <BrowserRouter>
        <SalesProvider>
          <ClientsProvider>
            <ProductsProvider>
              <Routes>
                <Route element={<Login isToken={isToken} setIsToken={setIsToken} />} path='/' />
                <Route element={<Home isToken={isToken} setIsToken={setIsToken} />} path='/home' />
                <Route element={<Shopping />} path='/shopping' />
              </Routes>
            </ProductsProvider>
          </ClientsProvider>
        </SalesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
