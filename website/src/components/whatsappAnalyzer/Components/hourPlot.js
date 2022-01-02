import '../WhatsAppAnalyzer.css'
import React from 'react'
import Plot from 'react-plotly.js'

// Plot a bar plot of the times messages were sent on
function HourPlot(props) {

  let hours = props.hours
  let totalMessages = props.totalMessages
  let x = Object.keys(hours)
  let y = Object.values(hours)

  // Calculate percentage of message every hour
  y = y.map(element => 100 * element / totalMessages)

  return (
    <div>
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'bar',
            textinfo: 'none',
          }
        ]}

        layout={{
          plot_bgcolor:"#131c21", paper_bgcolor:"#131c21", 
          title:{ text:'Messages per hour', font:{color:'#00bfa5'}},  
          xaxis:{title:{text:"Hour"}, titlefont:{color:'#00bfa5'}, color:'#00bfa5'},
          yaxis:{title:{text:"Percentage of messages (%)"}, titlefont:{color:'#00bfa5'}, color:'#00bfa5'},
          margin:{t:25, b:125},
        }}
      />
    </div>
  )
}

export default HourPlot