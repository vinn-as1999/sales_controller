import React from 'react'
import Chart from 'react-apexcharts'

function GeneralCharts() {
  const options = {
    chart: {
        type: 'bar',
        height: '5vh'
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    xaxis: {
        title: {
            text: 'Valores',
            align: 'center'
        },
        categories: [
            'João',
            'Maria',
            'Ana',
            'Paulo'
        ],
    },
    yaxis: {max: 2500},
    title: {
        text: 'Saldo Devedor',
        align: 'center',
    }
  }

  const series = [{
    name: 'Total Vendas',
    data: [1000, 2000, 1500, 1350]  // Valores correspondentes a cada cliente
  }]

  return (
    <>
      <main style={{margin: '5px'}}>
          <Chart options={options}
            series={series}
            type='bar'
            width={600}
            height={200} />
      </main>
    </>
  )
}

export default GeneralCharts
