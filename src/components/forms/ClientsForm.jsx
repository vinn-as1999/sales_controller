import React, { useState } from 'react'
import '../../../styles/Clients.css'

function ClientsForm(props) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [obs, setObs] = useState('');

  async function addClients() {
    const response = await fetch();
    
    if (!response.ok) {
      console.log('Erro ao adicionar cliente', response);
      return
    }

    const data = await response.json();

    if (data[0].error) {
      console.log(data[0].error);
      return
    }
  };


  return (
    <>
      <main className='cliFormMain'>
        <form>
            <label>
                Nome:
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />

            <label>
                Contato:
            </label>
            <input type="number" value={contact} onChange={e => setContact(e.target.value)} />

            <label>
                Local/Endereço:
            </label>
            <input type="text" value={clientAddress} onChange={e => setClientAddress(e.target.value)} />

            <label>
                Observações:
            </label>
            <textarea value={obs} onChange={e => setObs(e.target.value)} />

            <button onClick={e => {addClients(); e.preventDefault()}}>
                Salvar
            </button>
        </form>
      </main>
    </>
  )
}

export default ClientsForm
