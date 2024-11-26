import React, { useContext, useEffect, useState } from 'react'
import History from './History'
import '../../../styles/gInfo.css'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { SalesContext } from '../contexts/SalesContext'
import { ClientsContext } from '../contexts/ClientsContext'

function GeneralInfo() {
  const {sales} = useContext(SalesContext);
  const {clientsList} = useContext(ClientsContext);
  const [pending, setPending] = useState([]);
  const [value, setValue] = useState('')

  useEffect(() => {
    const getInformations = () => {
        const cliInfo = sales.flatMap((sale) => {
            const cliArr = clientsList.filter((client) => {
                console.log('sale', sale.client, 'client', client.client);
                return sale.client === client.client;
            });
    
            return cliArr;
        });
    
        console.log('o cliInfo', cliInfo);
    
        setPending(cliInfo);
    };

    getInformations();

    console.log('o pending atualizado', pending);
}, [sales, clientsList]);



  return (
    <>
      <main className='gInfoMain'>
        <header>
            <article>
                <div className='artTitle'>
                    Total (vendas):    
                </div>
                <div className='artValue'>
                    55
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Total obtido (R$)
                </div>
                <div className='artValue'>
                    R$ 55,55
                </div>
            </article>

            <article>
                <div className='artTitle'>
                    Projeção mensal
                </div>
                <div className='artValue'>
                    R$ 555,55
                </div>
            </article>
        </header>

        <section className='gITable'>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Contato</th>
                        <th>Local</th>
                        <th>Pendência</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pending.length > 0 ? pending.map((pending, index) => (
                            <tr key={index}>
                                <td>{pending.client}</td>
                                <td>{pending.contact}</td>
                                <td>{pending.address}</td>
                                <td>
                                    R$ {
                                        sales.find(sale => sale.client === pending.client)?.price || 'N/A'
                                    }
                                </td>
                            </tr>
                        )) : null
                    }
                </tbody>
            </table>
        </section>
      </main>
    </>
  )
}

export default GeneralInfo
