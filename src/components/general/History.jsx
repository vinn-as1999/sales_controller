import React, { useContext, useState, useEffect } from 'react'
import { BsThreeDots } from "react-icons/bs"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { FaExclamation } from "react-icons/fa6"
import { SalesContext } from '../contexts/SalesContext'
import HistoryForm from '../forms/HistoryForm'
import Empty from '../messages/Empty'

function History(props) {
  const {history} = useContext(SalesContext);
  const [name, setName] = useState('');
  const [date_key, setDate_key] = useState(props.getDate(true));
  const [historyList, setHistoryList] = useState([]);

  const getHistByDate = () => {
    const list = history.filter(data => data.date_key === date_key);

    if (name !== '') {
      const filteredList = list.filter(data => data.client === name) 
      setHistoryList(filteredList)

    } else {
      setHistoryList(list)
    }
  };

  useEffect(() => {
    getHistByDate();
  }, [date_key])


  return (
    <>
      <main className='histMain'>
        <header>
          <HistoryForm setDate_key={setDate_key} 
            setName={setName} 
            getDate={props.getDate}
            getHistByDate={getHistByDate} />
        </header>
        <h2 className='dateKey'>{date_key}</h2>
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
                historyList.length > 0 
                  ? historyList.map((sale) => (
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
                  )) 
                  : null
              }
            </tbody>
        </table>
      </main>
    </>
  )
}

export default History
