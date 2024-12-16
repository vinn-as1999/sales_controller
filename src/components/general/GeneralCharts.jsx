import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { SalesContext } from '../contexts/SalesContext'

function GeneralCharts() {
  const {sales, pending} = useContext(SalesContext);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState();

  function get() {
    const processedSales = [];
    const salesMap = {};
    
    sales.forEach(sale => {
      if (salesMap[sale.client]) {
        salesMap[sale.client].price += sale.price;

      } else {
        salesMap[sale.client] = { client: sale.client, price: sale.price };
        processedSales.push(salesMap[sale.client]);
      }
    });

    const names = processedSales.map(client => client.client);
    const prices = processedSales.map(client => client.price);

    setCategories(names)
    setData(prices)
  };

  useEffect(() => {
    get()
  }, [])

  return (
    <>
      <main className='genChartsMain'>
          <section>
            <h3>Saldo Devedor</h3>
            <Chart options={{
              chart: {
                type: 'bar',
                height: '5vh'
              },
              plotOptions: {
                  bar: {
                      horizontal: true,
                      barHeight: '60%'
                  },
                },
                colors: ['#C4423B'],
                xaxis: {
                  title: {
                      text: 'Valores',
                      align: 'center'
                  },
                  categories: categories, 
                },
              yaxis: {max: 100}
              }}

              series={
                [{
                  name: 'Total Vendas',
                  data: data // virá de outro lugar
                }]
              }
              type='bar'
              width={600}
              height={250} />
          </section>

          <section>
            <h3>Mais Vendidos</h3>
            <h4>(últimos 7 dias)</h4>

            <Chart options={{
              chart: {
                type: 'line'
              },
              xaxis: {
                title: '7 dias',
                align: 'center',
                categories: ['05/11', '06/11', '07/11', '08/11', '09/11', '10/11', '11/11'] // array com os últimos sete dias
              },
              yaxis: {max: 20}
            }}
            series={[
              { name: 'Paçoca', data: [10, 5, 15, 13, 11, 2, 20] },
              { name: 'Cocada', data: [8, 10, 6, 20, 4, 2, 14] },
              { name: 'Amendoin', data: [3, 8, 1, 13, 10, 1, 4] },
              { name: 'Alpino', data: [2, 6, 8, 15, 6, 13, 6] }
            ]}
            type='line'
            width={600}
            height={250} />
          </section>

          <section>
            <h3>Valor Obtido</h3>
            <h4>(últimos 7 dias)</h4>
            
            
          </section>
      </main>
    </>
  )
}

export default GeneralCharts
