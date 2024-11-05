import React, { useContext, useState } from 'react'
import ProductsBttn from '../bttns/ProductsBttn.jsx'
import { ProductsContext } from '../contexts/ProductsContext.jsx'
import '../../styles/Products.css'


function Products() {
  const {products, setProducts} = useContext(ProductsContext)
  const [visibleCategories, setVisibleCategories] = useState({});

  // Alterna a visibilidade de uma categoria específica
  function toggleList(cat) {
    setVisibleCategories(prevState => ({
      ...prevState,
      [cat]: !prevState[cat] // alterna entre true e false
    }));
  }

  return (
    <>
      <main className='prodMain'>
        {Object.keys(products).length > 0 ? Object.keys(products).map((cat) => (
          <div key={cat}>
            <h2 onClick={() => toggleList(cat)}>{cat}</h2>
            <ul style={{ display: visibleCategories[cat] ? 'block' : 'none' }}>
              {products[cat].map((product, index) => (
                <li key={index}>
                  <ProductsBttn 
                    productName={product.Produto} 
                    productValue={product.Preço} 
                    productQty={product.Quantidade}
                  />
                </li>
              ))}
            </ul>
          </div>
        )) : (<div>Nada aqui</div>)}
      </main>
    </>
  );
}

export default Products;
