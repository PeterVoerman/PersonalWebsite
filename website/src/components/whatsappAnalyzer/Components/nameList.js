import '../WhatsAppAnalyzer.css'
import React from 'react'

import NameButton from './nameButton'

// Generate a list of names in the chat
function NameList(props) {

  let nameList = props.nameList

  var rows = []
  for (var i = 0; i < nameList.length; i+=2) {

    // Add two names to every row
    rows.push(<div className='row'>
                <NameButton onClick={name => props.onClick(name)} key={i} name={nameList[i]}/>
                <NameButton onClick={name => props.onClick(name)} key={i+1} name={nameList[i+1]}/>
              </div>)
  }

  return (
    <div className='namelist'>
      Selected: {props.currentName}
      <br/>
      Total messages: {props.messageCounter}
      <div className='container'>{rows}</div>
    </div>
  )
}

export default NameList