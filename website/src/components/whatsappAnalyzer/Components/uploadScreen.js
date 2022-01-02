import '../WhatsAppAnalyzer.css'
import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

// Generate the upload screen
function UploadScreen(props) {

  // Read the input file
  // Thanks to https://stackoverflow.com/questions/55830414/how-to-read-text-file-in-react :)
  const readFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => { 
      const input_text = (e.target.result)
      props.setLogs(input_text)
    }
    reader.readAsText(e.target.files[0])
  }
  
  return (
  <Container className="analyzer">
    <h1>WhatsApp Analyzer</h1>
      <Row>
        <Col className="explanation">
          <h4>How to analyze your WhatsApp chat logs:</h4>
          <ul>
            <li>Open a WhatsApp chat and tap the three dots in the top left of your screen</li>
            <li>Select more -{'>'} Export chat</li>
            <li>Select without media</li>
            <li>Send the chat logs to yourself via WhatsApp/email/bluetooth</li>
            <li>Upload the chat logs</li>
          </ul>
        </Col>
        <Col xs={2}/>
        <Col className='upload'>
          Upload files by dragging them on the box below or by clicking on it.
          <br/>
          <label for='inputfile' className='inputlabel'>
            <input type="file"
                  id="inputfile" className='input' onChange={(f)=>readFile(f)}/>
          </label>
        </Col> 
      </Row>
    </Container>
  )
}

export default UploadScreen