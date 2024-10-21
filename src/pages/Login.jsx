import React, { useEffect, useState } from 'react'
import LoginForm from '../components/forms/LoginForm.jsx'
import '../../styles/Login.css'
import Register from '../components/Register.jsx';

function Login() {
  const [register, setRegister] = useState(false);

  useEffect(() => console.log(register), [register])

  return (
    <>
      <main className='loginMain'>
        <section className='loginBox'>
            <article className='logBoxInputs'>
                { register === false ? <LoginForm setRegister={setRegister} /> : <Register setRegister={setRegister} />
                }
            </article>

            <article className='message'>
                <div className='greetings'>
                    Bem-vindo de volta!
                </div>

                <div className='phrase'>
                    Acesse seu painel e gerencie suas vendas com rapidez e praticidade.
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
