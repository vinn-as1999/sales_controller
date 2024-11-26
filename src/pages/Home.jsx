import React, {useContext, useEffect, useState} from 'react'
import { BiInfoSquare } from "react-icons/bi"
import { BsBuildingGear } from "react-icons/bs"
import { GrHistory } from "react-icons/gr"
import { RiContactsLine } from "react-icons/ri"
import { AiOutlineProduct } from "react-icons/ai"
import { MdOutlineInventory } from "react-icons/md"
import { CiLogout } from "react-icons/ci"
import { ProductsContext } from '../components/contexts/ProductsContext.jsx'
import '../../styles/Home.css'
import NewSales from '../components/general/NewSales.jsx'
import History from '../components/general/History.jsx'
import ClientsInfo from '../components/general/ClientsInfo.jsx'
import Clients from '../components/general/Clients.jsx'
import Products from '../components/general/Products.jsx'
import ProductsForm from '../components/forms/ProductsForm.jsx'
import Empty from '../components/messages/Empty.jsx'
import Inventory from '../components/general/Inventory.jsx'
import GeneralInfo from '../components/general/GeneralInfo.jsx'
import GeneralCharts from '../components/general/GeneralCharts.jsx'
import { useNavigate } from 'react-router-dom'
import ClientsForm from '../components/forms/ClientsForm.jsx'

const name = localStorage.getItem('username');

function Home(props) {
  const navigate = useNavigate();
  const {products, setProducts} = useContext(ProductsContext)
  const [title, setTitle] = useState('Informações gerais');
  const [clients, setClients] = useState(false);
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [activeComponent, setActiveComponent] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [activate, setActivate] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });


  function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();

    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`
  };


  function getHour() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  };


  function renderComponent(title, component) {
    setTitle(title);
    setActiveComponent(component)
    setClients(false)
  };


  function handleLogout() {
    localStorage.clear();
    props.setIsToken(false);
  };


  useEffect(() => {
    const updateGreeting = () => {
      const hours = time.getHours();
      if (hours < 12) {
        setGreeting("Bom dia");
      } else if (hours < 18) {
        setGreeting("Boa tarde");
      } else {
        setGreeting("Boa noite");
      }
    };

    updateGreeting();

    const timer = setInterval(() => {
      setTime(new Date());
      updateGreeting();
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);


  useEffect(() => {
    if (!props.isToken) {
      navigate('/');
    }
  }, [props.isToken, navigate]);


  useEffect(() => renderComponent('Informações gerais', <GeneralInfo />), [])

  return (
    <>
      <main className='homeMain'>
        <sidebar>
          <div className="iconTextWrapper" 
            onClick={() => renderComponent('Informações gerais', <GeneralInfo />)}>
            <BiInfoSquare size={30} />
            <div>Informações gerais</div>
          </div>
          <div className="iconTextWrapper" 
            onClick={() => renderComponent('Adicionar vendas feitas', <NewSales setClients={setClients} getDate={getDate} getHour={getHour} />)}>
            <BsBuildingGear size={30} />
            <div>Adicionar vendas feitas</div>
          </div>
          <div className="iconTextWrapper" 
            onClick={() => renderComponent('Histórico de vendas', <History setClients={setClients} getDate={getDate} getHour={getHour} />)}>
            <GrHistory size={30} />
            <div>Histórico de vendas</div>
          </div>
          <div className="iconTextWrapper" onClick={() => renderComponent('Clientes', <Clients setClients={setClients} />)}>
            <RiContactsLine size={30} />
            <div>Clientes</div>
          </div>
          <div className="iconTextWrapper" onClick={() => renderComponent('Produtos', <Products setTrigger={setTrigger} />)}>
            <AiOutlineProduct size={30} />
            <div>Produtos</div>
          </div>
          <div className="iconTextWrapper" onClick={() => renderComponent('Inventário', <Inventory trigger={trigger} setTrigger={setTrigger} />)}>
            <MdOutlineInventory size={30} />
            <div>Inventário</div>
          </div>
          <div className="iconTextWrapper" onClick={handleLogout}>
            <CiLogout size={30} />
            <div>Sair</div>
          </div>
        </sidebar>

        <section className='generalInfo'>
          <article className='giHeader'>
            <div className='gihGreetings'>{greeting}, {name}</div>
            <div className='gihCapital'>Capital: R$ 500,00</div>
          </article>

          <article className='giTitle'>
            {title}
          </article>

          <article className='info'>
            { 
              activeComponent ? activeComponent : 
              <div className="empty">
                <Empty />
              </div> 
            }
            <article className='singularInfo'>
              {
                clients === true ? <ClientsInfo setClients={setClients} /> : 
                (title === 'Produtos' ? <ProductsForm trigger={trigger} /> : 
                  (title === 'Inventário' ? <Products setActivate={setActivate} setTrigger={setTrigger} /> : 
                    (title === 'Informações gerais' ? <GeneralCharts /> : 
                      (title === 'Clientes' ? <ClientsForm /> :
                <div className="empty">
                  <Empty />
                </div>))))
              }
            </article>
          </article>
        </section>
      </main>
    </>
  )
};

export default Home
