import React from 'react'
import '../../styles/Clients.css'
import ClientsBttn from './bttns/ClientsBttn'

function Clients(props) {
    
  return (
    <>
      <main className='clientsMain'>
        {props.clientsList.length > 0 ? (
          props.clientsList.map((value, index) => (
          <div key={index}>
            <ClientsBttn setClients={props.setClients} 
              name={value.client}
              contact={value.contact} />
          </div>
        ))
        ) : 'n'}
      </main>
    </>
  ) 
}

export default Clients
