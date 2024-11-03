import React, { useEffect } from 'react'
import '../../styles/Clients.css'
import ClientsBttn from './bttns/ClientsBttn'

function Clients(props) {
  
  useEffect(() => {
    console.log('foi')
    console.log(props.clientsList)
  }, [props.clientsList]);

  console.log('aqui', props.clientsList)

  return (
    <main className='clientsMain'>
      {props.clientsList.length > 0 ? (
        props.clientsList.map((value, index) => (
          <div key={index}>
            <ClientsBttn 
              setSelectedClient={props.setSelectedClient}
              setClients={props.setClients} 
              name={value.client}
              contact={value.contact} 
            />
          </div>
        ))
      ) : (
        <p>Nenhum cliente encontrado</p>
      )}
    </main>
  );
  
}

export default Clients
