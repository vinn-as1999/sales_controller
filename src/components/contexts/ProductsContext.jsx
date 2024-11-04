import React, {createContext, useState} from 'react'

export const ProductsContext = createContext()

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(() => {
        const storedProd = localStorage.getItem('products');
        return storedProd ? JSON.parse(storedProd) : {}
    });

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
        {children}
    </ProductsContext.Provider>
  )
};
