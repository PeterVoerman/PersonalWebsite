import React from 'react'
import { Grid, Typography, Box } from '@mui/material'

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
    <Box sx={{color:"#00bfa5", textAlign:"center"}}>
      <Typography variant='h2' sx={{m:3}}>WhatsApp Analyzer</Typography>
      <Grid container>
        <Grid item xs={5} md={3.5} sx={{ml:{xs:5,lg:35}, textAlign:"left", background:"#262d31", borderRadius:"8px"}}>
          <Typography variant='h4' sx={{m:2}}>How to analyze your WhatsApp chat logs:</Typography>
          <ul>
            <li>Open a WhatsApp chat and tap the three dots in the top left of your screen</li>
            <li>Select more -{'>'} Export chat</li>
            <li>Select without media</li>
            <li>Send the chat logs to yourself via WhatsApp/email/bluetooth</li>
            <li>Upload the chat logs</li>
          </ul>
        </Grid>
        <Grid item xs={0.5} md={2}/>
        <Grid item xs={5} md={3.5} sx={{textAlign:"left", background:"#262d31", borderRadius:"8px"}}>
          <Typography sx={{m:2}}>Upload files by dragging them on the box below or by clicking on it.</Typography> 
          <Box sx={{borderStyle:"dashed", borderRadius:"8px", m:2, height:"70%"}}>
            <label for='inputfile'>
              <input type="file"
                    id="inputfile" style={{opacity:0, cursor:"pointer", height:"20vh"}} onChange={(f)=>readFile(f)}/>
            </label>
          </Box>
        </Grid> 
      </Grid>
    </Box>
  )
}

export default UploadScreen