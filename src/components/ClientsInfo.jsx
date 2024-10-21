import React from 'react';
import Chart from 'react-apexcharts'
import { IoIosClose } from 'react-icons/io'

function ClientsInfo(props) {
  const options = {
    chart: {
      type: 'bar',  // Define o tipo de gráfico como colunas (barras verticais)
      height: 350
    },
    xaxis: {
      type: 'datetime',  // Especifica que o eixo X usará datas
      labels: {
        format: 'dd/MM/yyyy',  // Formato para exibir dias
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
            <IoIosClose size={50} />
          </div>
          <label htmlFor="">Nome:</label>
          <div className="cliData">
            João
          </div>

          <label htmlFor="">Contato:</label>
          <div className="cliData">
            (19) 9999-9999
          </div>

          <label htmlFor="">Local/Endereço:</label>
          <div className="cliData">
            CAMPINAS
          </div>
        </header>
        
        <section className='charts'>
          <header>
            Gráfico:
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
