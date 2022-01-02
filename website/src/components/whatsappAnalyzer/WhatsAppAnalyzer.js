import React, { useState } from 'react';
import './WhatsAppAnalyzer.css';

import AnalysisScreen from './Components/analysisScreen'
import UploadScreen from './Components/uploadScreen'

// Generate the application
function WhatsAppAnalyzer() {

  const [logs, setLogs] = useState('')

  // Show this screen before analyzing
  if (logs === '') {
    return (
      <div className='uploadscreen'>
      <UploadScreen setLogs={setLogs}/>
      </div>
    )
  }
  
  // Show this screen after analyzing
  else {
    return (
      <div>
      <AnalysisScreen 
        logs={logs}
        setLogs={setLogs}
        
      />
      </div>
    )
  }
}

export default WhatsAppAnalyzer;
