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
        <ProductsProvider>
          <SalesProvider>
            <ClientsProvider>
              <Routes>
                <Route 
                  path="/" 
                  element={<Login isToken={isToken} setIsToken={setIsToken} />} 
                />
                <Route 
                  path="/home" 
                  element={<Home isToken={isToken} setIsToken={setIsToken} />} 
                />
                <Route 
                  path="/shopping" 
                  element={<Shopping />} 
                />
              </Routes>
            </ClientsProvider>
          </SalesProvider>
        </ProductsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
