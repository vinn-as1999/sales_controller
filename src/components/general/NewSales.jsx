import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../../../styles/NewSales.css'
import { ClientsContext } from '../contexts/ClientsContext'
import { ProductsContext } from '../contexts/ProductsContext'
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { SalesContext } from '../contexts/SalesContext'


function NewSales(props) {
  const user_id = localStorage.getItem('id');
  const username = localStorage.getItem('username');
  const {sales, registerPayment, registerSales} = useContext(SalesContext);
  const [client, setClient] = useState('');
  const [prodName, setProdName] = useState('');


  useEffect(() => {
    return () => {}
  }, [sales])
  

  return (
    <>
      <main className='salesMain'>
        <section className='newSales'>
            <form
              onSubmit={(e)=>registerSales(e, user_id, username, client, prodName, 1, 'pending')}>
              <div>
                <label>Cliente: </label>
                <input type="text" value={client} placeholder='ex: João' autoFocus={true} onChange={e => setClient(e.target.value)} />
              </div>
              <div>
                <label htmlFor="">Produto: </label>
                <input type="text" placeholder='ex: Paçoca' value={prodName} onChange={(e) => setProdName(e.target.value)} />
              </div>
              <div style={{display: 'flex'}}>
                <button>Salvar</button>
              </div>
            </form>
        </section>

        <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                sales.length > 0 ? sales.map((sale, index) => sale.status === 'pending' && (
                  <tr key={index}>
                    <td>{sale.client}</td>
                    <td>{sale.product}</td>
                    <td>R$ {sale.price}</td>
                    <td>{sale.day}</td>
                    <td>
                      <IoCheckmarkDoneOutline 
                          className='check-status' 
                          onClick={() => registerPayment(sale)} />
                    </td>
                  </tr>
                )) : null
              }
            </tbody>
        </table>
      </main>
    </>
  )
}

export default NewSales
