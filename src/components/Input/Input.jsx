import "./Input.scss"
import React from 'react'

const Input = () => {
  return (
    <div className='input'>
      <input className="input__field" type="text" placeholder="Type somthing..."/>
      <div className="input__send">
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input