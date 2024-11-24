import React, { useContext } from 'react'
import { BsThreeDots } from "react-icons/bs"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { FaExclamation } from "react-icons/fa6"
import { SalesContext } from '../contexts/SalesContext'
import Empty from '../messages/Empty'

function History(props) {
  const {history, setHistory} = useContext(SalesContext)

  return (
    <>
      <main className='histMain'>
        <form className='historyForm'>
          <label>
            Cliente: 
          </label>
          <input type="text" />

          <label>
            Mês: 
          </label>
          <input type="number" />

          <label>
            Ano: 
          </label>
          <input type="number" />
        </form>
        <table>
            <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {
                history.length > 0 ? history.map((sale) => (
                  <tr>
                    <td>{sale.client}</td>
                    <td>{sale.product}</td>
                    <td>{sale.price}</td>
                    <td>{sale.day}</td>
                    <td>{sale.hour}</td>
                    <td>
                      {
                        sale.status === "pending" 
                          ? <BsThreeDots className='pending-status' />
                          : <IoCheckmarkDoneSharp className='check-status' />
                      }
                    </td>
                  </tr>
                )) : <div className="empty"><Empty /></div> 
              }
              <tr onClick={() => {props.setClients(true); getClientInfo('João')}}>
              </tr>
            </tbody>
        </table>
      </main>
    </>
  )
}

export default History
