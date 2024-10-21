import React from 'react'
import { AiOutlineProduct } from "react-icons/ai"

function ProductsBttn(props) {

  return (
    <>
      <main className='prodBttnMain'>
        <section>
            <article className='symbol'>
                <AiOutlineProduct />
            </article>
            <article className='inf'>
                <div className='prodName'>
                    {props.productName.charAt(0).toUpperCase() + props.productName.slice(1)}
                </div>
                <div className='prodValue'>
                    Valor: {`R$ ${props.productValue}`}
                </div>
                <div className='prodQty'>
                    Quantidade: {props.productQty}
                </div>
            </article>
        </section>
      </main>
    </>
  )
}

export default ProductsBttn
