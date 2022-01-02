import '../WhatsAppAnalyzer.css';
import React from 'react';
import Plot from 'react-plotly.js'

// Plot messages per day
function DatePlot(props) {

  let messageDates = props.messageDates

  let xData = Object.keys(messageDates)
  let yData = Object.values(messageDates)
  
  return(
    <div>
      <Plot
        data={[
          {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
          },
        ]}

        layout={{
          plot_bgcolor:"#131c21", paper_bgcolor:"#131c21", 
          title:{ text:'Messages per day', font:{color:'#00bfa5'}},  
          xaxis:{title:{text:"Date"}, titlefont:{color:'#00bfa5'}, color:'#00bfa5', nticks:15},
          yaxis:{title:{text:"Amount of messages"}, titlefont:{color:'#00bfa5'}, color:'#00bfa5'},
        }}

        useResizeHandler={true}
        style={{width: "95%", height: "95%"}}
      />
    </div>
  )
}

export default DatePlot