import React from 'react'

function Error(props) {
  return (
    <>
      <main className='errorMsg'>
        {props.error}
      </main>
    </>
  )
}

export default Error
