import React, { useContext, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { SalesContext } from '../contexts/SalesContext'

function GeneralCharts() {
  const {sales, pending, history} = useContext(SalesContext);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState();


  // Função para obter os últimos 7 dias no formato 'DD/MM'
const getLast7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    days.push(day.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
  }
  return days;
};

// Processar as vendas
const processSalesForChart = (history) => {
  const last7Days = getLast7Days(); // Array com os últimos 7 dias no formato ['05/11', '06/11', ...]
  
  // Objeto para agrupar produtos por nome e data
  const productData = {};

  history.forEach((sale) => {
    const { product, quantity, day } = sale;

    // Se o produto ainda não está no mapa, inicialize-o
    if (!productData[product]) {
      productData[product] = Array(7).fill(0); // Inicializar array para os últimos 7 dias
    }

    // Verificar se o dia da venda está nos últimos 7 dias
    const dayIndex = last7Days.indexOf(day);
    if (dayIndex !== -1) {
      productData[product][dayIndex] += quantity; // Adicionar a quantidade ao índice do dia correspondente
    }
  });

  // Converter o objeto em um array no formato esperado pelo gráfico
  const series = Object.entries(productData).map(([name, data]) => ({
    name, // Nome do produto
    data, // Array com a quantidade por dia
  }));

    return { series, cat: last7Days };
  };
  // Obter os dados do gráfico
  const { series, cat } = processSalesForChart(history);



  function getPending() {
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

    console.log(processedSales)

    setCategories(names)
    setData(prices)
  };

  useEffect(() => {
    getPending();
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
                  name: 'Devendo',
                  data: data // virá de outro lugar
                }]
              }
              type='bar'
              width={580}
              height={250} />
          </section>

          <section>
            <h3>Mais Vendidos</h3>
            <h4>(últimos 7 dias)</h4>

            <Chart
              options={{
                chart: { type: 'line' },
                xaxis: {
                  type: 'category',
                  title: { text: '7 dias', align: 'center' },
                  categories: cat, // Os últimos 7 dias
                },
                yaxis: { max: 20 },
              }}
              series={series} // Dados processados para o gráfico
              type="line"
              width={580}
              height={250}
            />
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
