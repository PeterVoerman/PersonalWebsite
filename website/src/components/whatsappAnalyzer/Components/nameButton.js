import '../WhatsAppAnalyzer.css'
import React from 'react'

// Generate a button to be used in the name list
function NameButton(props) {

  return (
      <div className='namebutton col' onClick={() => props.onClick(props.name)}>{props.name}</div>
    )
}

export default NameButton