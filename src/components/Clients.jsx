import React from 'react'
import '../../styles/Clients.css'
import ClientsBttn from './bttns/ClientsBttn'

function Clients(props) {
    
  return (
    <>
      <main className='clientsMain'>
        <ClientsBttn setClients={props.setClients} />
      </main>
    </>
  ) 
}

export default Clients
