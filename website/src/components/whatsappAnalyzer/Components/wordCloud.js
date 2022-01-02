import '../WhatsAppAnalyzer.css'
import React from 'react'
import { TagCloud } from 'react-tagcloud'

// Generate a word cloud of most used words
function WordCloud(props) {

  let wordCloud = props.wordCloud
  let emojiJSON = props.emojiJSON

  let en = props.en
  let nl = props.nl

  // Filter out stop words and emojis
  Object.keys(wordCloud).forEach(word => {
    if (en.includes(word) || nl.includes(word)) {
      wordCloud[word] = 0
    }

    let splitWord = props.emojiStringToArray(word)
    splitWord.forEach((char) => {
      if (emojiJSON.hasOwnProperty(char)) {
        wordCloud[word] = 0
      }
    })
  })

  // Format and sort the data
  let data = []
  Object.keys(wordCloud).forEach((key) => {
    data.push({value: key, count: wordCloud[key]})
  })

  data = props.sortJSON(data, "count").slice(0, 25)

  return (
    <div className='wordcloud'>
    <h2>Most used words</h2>
      <TagCloud
        tags={data}
        minSize={20}
        maxSize={50}
      />
    </div>
  )
}

export default WordCloud