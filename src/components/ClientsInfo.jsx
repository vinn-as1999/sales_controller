import React from 'react';
import Chart from 'react-apexcharts'
import { IoIosClose } from 'react-icons/io'

function ClientsInfo(props) {
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
      [new Date(2024, 9, 1).getTime(), 12], // 1 de Outubro
      [new Date(2024, 9, 3).getTime(), 5.5], // 3 de Outubro
      [new Date(2024, 9, 5).getTime(), 14],  // 5 de Outubro
      [new Date(2024, 9, 7).getTime(), 5],  // 7 de Outubro
      [new Date(2024, 9, 9).getTime(), 3.5], // 9 de Outubro
      [new Date(2024, 9, 11).getTime(), 7],  // 11 de Outubro
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
            João
          </div>

          <label>Contato:</label>
          <div className="cliData">
            (19) 9999-9999
          </div>

          <label>Local/Endereço:</label>
          <div className="cliData">
            CAMPINAS
          </div>

          <label>Observações</label>
          <div className="cliData" style={{fontSize: 15}}>
            coments
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
