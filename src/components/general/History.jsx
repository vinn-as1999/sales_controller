import React, { useContext, useState } from 'react'
import { BsThreeDots } from "react-icons/bs"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { FaExclamation } from "react-icons/fa6"
import { SalesContext } from '../contexts/SalesContext'
import HistoryForm from '../forms/HistoryForm'
import Empty from '../messages/Empty'

function History(props) {
  const {history, setHistory} = useContext(SalesContext);
  const [month, setMonth] = useState('mês');
  const [year, setYear] = useState('ano');


  return (
    <>
      <main className='histMain'>
        <header>
          <HistoryForm />
          <h2>{`${month}/${year}`}</h2>
        </header>
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
                    <td>R$ {String(sale.price).padStart(2,'0')}</td>
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
                )) : null
              }
            </tbody>
        </table>
      </main>
    </>
  )
}

export default History
