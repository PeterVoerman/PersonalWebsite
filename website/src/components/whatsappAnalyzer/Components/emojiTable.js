import '../WhatsAppAnalyzer.css';
import React from 'react';

// Generate a table that shows the most used emojis
function EmojiTable(props) {

  let emojiJSON = props.emojiJSON

  // Format and sort the data
  let data = []
  Object.keys(emojiJSON).forEach((key) => {
    data.push({value: key, count: emojiJSON[key]})
  })
  data = props.sortJSON(data, "count").slice(0, 30)

  var rows = [];
  for (var i = 0; i < 14; i+=2) {

    // Add a row to the table, formatted like: "[emoji_1]: [count_1]    [emoji_2]: [count_2]"
    rows.push(<tr key={i}><td>{`${data[i].value}:${data[i].count}`}</td> <td>{`${data[i+1].value}:${data[i+1].count}`}</td></tr>);
  }

  return (
    <div>
      <h2>Most used emojis</h2>
      <center>
        <table>
          {rows}
        </table>
      </center>
    </div>
  )
}

export default EmojiTable