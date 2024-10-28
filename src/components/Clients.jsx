import React from 'react'
import '../../styles/Clients.css'
import ClientsBttn from './bttns/ClientsBttn'

function Clients(props) {
    
  return (
    <>
      <main className='clientsMain'>
        {props.clientsList.length > 0 ? <ClientsBttn setClients={props.setClients} /> : 'n'}
      </main>
    </>
  ) 
}

export default Clients
