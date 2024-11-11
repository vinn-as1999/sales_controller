import React, { useContext, useState } from 'react'
import ProductsBttn from '../bttns/ProductsBttn.jsx'
import { ProductsContext } from '../contexts/ProductsContext.jsx'
import { BiSolidTrash } from "react-icons/bi"
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa"
import '../../../styles/Products.css'
import Empty from '../messages/Empty.jsx'

// PRONTO!

function Products(props) {
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
                  <FaChevronUp className='qtyBttn' color='#45CB85' title='+1' />
                  <FaChevronDown className='qtyBttn' color='#F34747' title='-1' />
                  <BiSolidTrash className='qtyBttn' title='Remover produto'
                    onClick={() => props.deleteProduct(prod.name)} />
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
