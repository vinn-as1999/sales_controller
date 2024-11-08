import React, { useContext, useState } from 'react'
import ProductsBttn from '../bttns/ProductsBttn.jsx'
import { ProductsContext } from '../contexts/ProductsContext.jsx'
import { BiSolidTrash } from "react-icons/bi";
import '../../../styles/Products.css'
import Empty from '../messages/Empty.jsx'

// PRONTO!

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
        {products.length > 0 ? products.map((cat) => (
          <>
            <h2 onClick={() => toggleList(cat.category)}>{cat.category}</h2>
            <ul style={{ display: visibleCategories[cat.category] ? 'block' : 'none' }}>
              {cat.products.map((prod, index) => (
                <li key={index} style={{display: 'flex', alignItems: 'center'}}>
                  <ProductsBttn
                    productName={prod.name}
                    productPrice={prod.price}
                    productQty={prod.quantity}
                  />
                  <BiSolidTrash className='trashBttn' title='Remover produto' />
                </li>
              ))}
            </ul>
          </>
        )) : 
        (
          <div className='empty'>
            <Empty />
          </div>
        )} 
      </main>
    </>
  );
}

export default Products;
