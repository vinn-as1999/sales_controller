import React, { useEffect, useState } from 'react'
import LoginForm from '../components/forms/LoginForm.jsx'
import '../../styles/Login.css'
import Register from '../components/forms/Register.jsx';

function Login() {
  const [register, setRegister] = useState(false);
  const [welcome, setWelcome] = useState(true);

  useEffect(() => console.log(register), [register])

  return (
    <>
      <main className='loginMain'>
        <section className='loginBox'>
            <article className='logBoxInputs'>
                { register === false ? <LoginForm setRegister={setRegister} setWelcome={setWelcome} /> : <Register setRegister={setRegister} setWelcome={setWelcome} />
                }
            </article>

            <article className='message'>
                <div className='greetings'>
                    {
                      welcome ? 'Bem-vindo de volta!' : 'É um prazer tê-lo aqui'
                    }
                </div>

                <div className='phrase'>
                    {
                      welcome ? 'Acesse seu painel e gerencie suas vendas com rapidez e praticidade.' : 
                      'Registre-se e comece a gerenciar suas vendas com rapizes e praticidade!'
                    }
                </div>

                <div className='img'>
                    img
                </div>
            </article>
        </section>
      </main>
    </>
  )
}

export default Login
