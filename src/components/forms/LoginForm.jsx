import React, { useEffect } from 'react'

function LoginForm(props) {

  useEffect(() => props.setRegister(false), [])

  return (
    <>
      <form className='loginForm' style={{height: '60vh'}}>
        <div className='initialMsg'>
          <div className='enter'>
            Entre em sua conta
          </div>
          <div className='insert'>
            Insira suas credenciais aqui
          </div>
        </div>

        <label>Email</label>
        <input type="text" placeholder='exemplo@email.com' autoFocus={true} />

        <label htmlFor="">Senha</label>
        <input type="password" placeholder='Sua senha aqui' />

        <button>Entrar</button>
        
        <div className='registerLink'>
          Não possui uma conta? <span onClick={() => props.setRegister(true)}>Registre-se aqui</span>
        </div>
      </form>
    </>
  )
}
export default LoginForm
