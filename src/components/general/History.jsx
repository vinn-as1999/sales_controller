import React, { useContext } from 'react'
import { BsThreeDots } from "react-icons/bs"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { FaExclamation } from "react-icons/fa6"
import { SalesContext } from '../contexts/SalesContext'

function History(props) {
  const {history, setHistory} = useContext(SalesContext)

  return (
    <>
      <main className='histMain'>
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
                          ? <BsThreeDots size={25} color='#F13A43' />
                          : <IoCheckmarkDoneSharp size={25} color='#85FF9E' />
                      }
                    </td>
                  </tr>
                )) : (<div>nada n</div>)
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
