import '../WhatsAppAnalyzer.css'
import React from 'react'
import Plot from 'react-plotly.js'

// Plot a pie chart of amount of messages per person
function NamePlot(props) {

  let messageNames = props.messageNames

  let values = Object.values(messageNames)
  let labels = Object.keys(messageNames)

  return(
    <div>
      <Plot
        data={[
          {
            values: values,
            labels: labels,
            type: 'pie',
            textinfo: 'none',
            hoverinfo: 'label+percent'
          }
        ]}

        layout={{
          plot_bgcolor:"#131c21",
          paper_bgcolor:"#131c21", 
          title:{text:'Messages per person', font:{color:'#00bfa5'}}, 
          legend:{font:{color:'#00bfa5'}}
        }}

        useResizeHandler={true}
        style={{width: "95%", height: "95%"}}
      />
    </div>
  ) 
}

export default NamePlot