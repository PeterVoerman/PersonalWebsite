import React, { useState } from 'react';
import { Helmet } from 'react-helmet'
//import './WhatsAppAnalyzer.css';

import AnalysisScreen from './Components/analysisScreen'
import UploadScreen from './Components/uploadScreen'

// Generate the application
function WhatsAppAnalyzer() {

  const [logs, setLogs] = useState('')

  // Show this screen before analyzing
  if (logs === '') {
    return (
      <div className='uploadscreen'>
        <Helmet>
          <style>{'body { background-color: #131c21; }'}</style>
        </Helmet>
        <UploadScreen setLogs={setLogs}/>
      </div>
    )
  }
  
  // Show this screen after analyzing
  else {
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #131c21; }'}</style>
        </Helmet>
        <AnalysisScreen 
          logs={logs}
          setLogs={setLogs}
        />
      </div>
    )
  }
}

export default WhatsAppAnalyzer;
