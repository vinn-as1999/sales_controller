import React from 'react'
import '../../../styles/Clients.css'

function ClientsForm(props) {


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
            <input type="text" />

            <label>
                Contato:
            </label>
            <input type="number" />

            <label>
                Local/Endereço:
            </label>
            <input type="text" />

            <label>
                Observações:
            </label>
            <textarea></textarea>

            <button onClick={(e) => {addClients(); e.preventDefault()}}>
                Salvar
            </button>
        </form>
      </main>
    </>
  )
}

export default ClientsForm
