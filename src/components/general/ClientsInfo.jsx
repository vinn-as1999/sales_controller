import React, { useContext, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { IoIosClose } from 'react-icons/io'
import { ClientsContext } from '../contexts/ClientsContext'
import { SalesContext } from '../contexts/SalesContext'

function ClientsInfo(props) {
  const {selectedClient} = useContext(ClientsContext);
  const {sales, history} = useContext(SalesContext);

  const list = history.filter(sale => sale.client === selectedClient.client);
  const days = list.map(client => client.day);


  useEffect(() => console.log('os dias', days), [selectedClient])

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd/MM/yyyy',
      }
    },
    yaxis: {
      title: {
        text: 'Quantidade'
      },
      min: 0,
      max: 15
    },
    title: {
      text: 'Quantidade',
      align: 'center'
    }
  };

  const series = [{
    name: 'Quantidade',
    data: [
      [new Date(2024, 9, 1).getTime(), 12],
      [new Date(2024, 9, 3).getTime(), 5.5], 
      [new Date(2024, 9, 5).getTime(), 14],  
      [new Date(2024, 9, 7).getTime(), 5],  
      [new Date(2024, 9, 9).getTime(), 3.5], 
      [new Date(2024, 9, 11).getTime(), 7],  
    ]
  }];

  return (
    <>
      <main className='cliInfoMain'>
        <header>
          <div className='closeBttn' onClick={() => props.setClients(false)}>
            <IoIosClose className='xbtt' size={50} />
          </div>
          <label>Nome:</label>
          <div className="cliData">
            {selectedClient["client"]}
          </div>

          <label>Contato:</label>
          <div className="cliData">
            {selectedClient["contact"]}
          </div>

          <label>Local/Endereço:</label>
          <div className="cliData">
            {selectedClient["address"]}
          </div>

          <label>Observações</label>
          <div className="cliData" style={{fontSize: 15}}>
            {selectedClient["observations"] ? selectedClient["observations"] : (
              <div style={{color: 'grey', fontStyle: 'italic', cursor: 'default'}}>
                Sem comentários
              </div>
            )}
          </div>
        </header>
        
        <section className='charts'>
          <header>
            Gráficos:
          </header>
          
          <article>
            <Chart
              options={options}
              series={series}
              type="bar"  // Gráfico de colunas
              height={270}  // Altura do gráfico
            />
          </article>
        </section>
      </main>
    </>
  );
}

export default ClientsInfo;
