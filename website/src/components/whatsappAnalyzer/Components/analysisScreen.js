import '../WhatsAppAnalyzer.css';
import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'

import DatePlot from './datePlot'
import NameList from './nameList'
import WordCloud from './wordCloud'
import NamePlot from './namePlot'
import EmojiTable from './emojiTable'
import HourPlot from './hourPlot'

let stopwords = require('stopwords-json')
let emojiList = require('emoji.json')

// Generate the analysis screen
function AnalysisScreen(props) {
  const [nameList, setNameList] = useState('')
  const [currentName, setCurrentName] = useState('Everyone')
  const [namesJSON, setNamesJSON] = useState('')

  let logs = props.logs

  // Initialize the variables that will contain the data
  let messageDates = {}
  let messageNames = {}
  let wordCloud = {}
  let hours = {}
  let messageCounter = 0

  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      hours[`0${i}`] = 0
    }
    else {
      hours[`${i}`] = 0
    }
  }

  let emojiJSON = {}
  emojiList.forEach((emoji) => {
    emojiJSON[emoji.char] = 0
  })

  // Add standard whatsapp messages to stopwords
  let en = stopwords['en']
  let nl = stopwords['nl']
  en.push('<media')
  en.push('omitted>')
  en.push('message')
  en.push('deleted')

  // Handle a click on the header to go back home
  const handleClickHome = () => {
    props.setLogs('')
    setNameList('')
    setCurrentName('Everyone')
    setNamesJSON('')
  }

  // Add functionality to the name buttons
  const handleClickName = name => {
    setCurrentName(name)
  }


  // Check which OS the file originated from
  let apple = false
  if (logs[0] === '[') {
    apple = true
  }

  // Do the analysis for apple devices
  if (apple === true) {

    // Each message starts with [ and ends with a newline
    let splitLogs = logs.split('\n[')

    // Loop through the messages
    splitLogs.slice(1).forEach((message) => {
      let splitMessageSpace = message.split(' ')
      let splitMessageColon = message.split(':')
      
      // Skip messages like "x left the chat"
      if (splitMessageColon.length === 4) {
          
        // Find the sender of the message and continue if that sender is selected
        let name = splitMessageColon[2].split(']')[1].slice(1)
        if (name === currentName || currentName === 'Everyone') {
          messageCounter++

          // Save the date each message was sent on
          let date = splitMessageSpace[0]
          if (messageDates.hasOwnProperty(date)) {
            messageDates[date] += 1
          }
          else {
            messageDates[date] = 1
          }
          
          // Save the sender of each message
          if (messageNames.hasOwnProperty(name)) {
            messageNames[name] += 1
          }
          else {
            messageNames[name] = 1
          }

          // Save the words in each message
          let actualMessage = splitMessageColon[3]
          let words = actualMessage.split(' ').slice(1)

          words.forEach((word) => {
            word = word.toLowerCase()
            if (word.slice(word.length - 1) === '\r') {
              word = word.slice(0, word.length - 1)
            }
            if (word.length > 1) {
              if (wordCloud.hasOwnProperty(word)) {
                wordCloud[word] += 1
              }
              else {
                wordCloud[word] = 1
              }  
            }        
          })

          // Save the hour each message was sent in
          let hour = splitMessageColon[0].slice(splitMessageColon[0].length-2, splitMessageColon[0].length)
          hours[hour] += 1

          // Save the amount of emojis sent
          let splitMessageEmoji = emojiStringToArray(actualMessage)
          splitMessageEmoji.forEach((emoji) => {
            if (emojiJSON.hasOwnProperty(emoji)) {
              emojiJSON[emoji] += 1
            }
          })
        }
      }
    })
  }

  // Do the analysis for android devices
  else {
    let splitLogs = logs.split('\n')

    splitLogs.slice(0).forEach((message) => {
      let splitMessageComma = message.split(',')

      // Newline in file is a new message if it starts with a date
      if (isDate(splitMessageComma[0]) && splitMessageComma.length > 1) {
        let splitMessageDashColon = splitMessageComma[1].split(/[:,-]+/)

        // Skip message like "x left the chat"
        if (splitMessageDashColon.length === 4) {

          // Find the sender of the message and continue if that sender is selected
          let name = splitMessageDashColon[2].slice(1)
          if (name === currentName || currentName === 'Everyone') {
            messageCounter++

            // Save the date each message was sent on
            let date = splitMessageComma[0]
            if (messageDates.hasOwnProperty(date)) {
              messageDates[date] += 1
            }
            else {
              messageDates[date] = 1
            }

            // Save the sender of each message
            if (messageNames.hasOwnProperty(name)) {
              messageNames[name] += 1
            }
            else {
              messageNames[name] = 1
            }

            // Save the words in each message
            let words = splitMessageDashColon[3]
            let splitWords = words.split(' ')

            splitWords.forEach((word) => {
              word = word.toLowerCase()
              if (word.slice(word.length - 1) === '\n') {
                word = word.slice(0, word.length - 1)
              }
              if (word.length > 1) {
                if (wordCloud.hasOwnProperty(word)) {
                  wordCloud[word] += 1
                }
                else {
                 wordCloud[word] = 1
                }
              }
            })

            // Save the hour each message was sent in
            let hour = splitMessageDashColon[0].slice(1)
            hours[hour] += 1

            // Save the emojis in each message
            let splitMessageEmoji = emojiStringToArray(splitMessageDashColon[3])
            splitMessageEmoji.forEach((emoji) => {
              if (emojiJSON.hasOwnProperty(emoji)) {
                emojiJSON[emoji] += 1
              }
            })
          } 
        }  
      }
    })
  }

  // Save all participants in the chat
  if (nameList === '' && Object.keys(messageNames).length > 0) {
    let names = Object.keys(messageNames)
    names.unshift("Everyone")
    setNameList(names)
    setNamesJSON(messageNames)
  }

  return (
    <Container fluid className='analyzer'>
      <h1 className='header' onClick={() => handleClickHome()}> WhatsApp Analyzer </h1>
      <Row>
        <Col><DatePlot messageDates={messageDates}/></Col>
        <Col xs={2}><NameList nameList={nameList} currentName={currentName} messageCounter={messageCounter} onClick={name => handleClickName(name)}/></Col>
        <Col><NamePlot messageNames={namesJSON}/></Col>
      </Row>
      <Row>
        <Col><WordCloud wordCloud={wordCloud} emojiJSON={emojiJSON} en={en} nl={nl} emojiStringToArray={emojiStringToArray} sortJSON={sortJSON}/> </Col>
        <Col><HourPlot hours={hours} totalMessages={messageCounter}/></Col>
        <Col className='emojitable'><EmojiTable emojiJSON={emojiJSON} sortJSON={sortJSON}/></Col>
      </Row>
    </Container>
  )
}

// Checks if a given string is a date
// Thanks to https://stackoverflow.com/a/25047903 :)
const isDate = function(date) {

    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date))
  }
  
// Sorts a JSON, outputs a sorted array
// Thanks to https://stackoverflow.com/a/14949429 :)
const sortJSON = (arr, key) => {

  return arr.sort(function(a, b) {
      var x = a[key]; var y = b[key]
      return ((x > y) ? -1 : ((x < y) ? 1 : 0))
  })
}

// Splits a string while taking emojis into account
// Thanks to https://stackoverflow.com/a/24531752 :)
const emojiStringToArray = (str) => {

  let splitString = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
  let arr = []

  for (let i=0; i<splitString.length; i++) {
    let char = splitString[i]
    if (char !== "") {
      arr.push(char)
    }
  }

  return arr
}

export default AnalysisScreen