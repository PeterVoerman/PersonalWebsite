import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Sketch from 'react-p5'
import { TextField, createTheme, ThemeProvider } from '@mui/material'

import './fractaltree.css'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function FractalTree() {
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [treeHeightCounter, setTreeHeightCounter] = useState({"height":12, "counter":0})
  const [p5, setP5] = useState()

  const handleTreeHeight = (event) => {
    if (event.key === 'Enter') {
      setTreeHeightCounter({"height":parseInt(event.target.value), "counter":treeHeightCounter['counter'] + 1})
      
    }
  }

  useEffect(() => {
    treeCoords = []
    if (p5) {
      p5.loop()
    }
  }, [treeHeightCounter])

  let lengthIncrement
  let treeCoords = []
  let colors = []
  

  gradient.setNumberRange(1, treeHeightCounter["height"])
  gradient.setSpectrum("blue", "lightblue")
  for (let i = 1; i <= treeHeightCounter["height"]; i++) {
    let color = "#" + gradient.colorAt(i)
    colors.push(color)
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth * 5/6, window.innerHeight).parent(canvasParentRef)
    setP5(p5)
    setHeight(window.innerHeight)
    setWidth(window.innerWidth * 5/6)
  }

  function draw(p5) {
    let treeHeight = treeHeightCounter['height']
    lengthIncrement = height / (treeHeight * 9)
    p5.clear()
    p5.strokeWeight(10)
    drawLine(p5, p5.width/2, p5.height, p5.width/2, p5.height-50, 0, treeHeight+1)

    if (treeCoords.length === 0 && width) {
      p5.noLoop()
      fractalTree(p5, p5.width/2, p5.height-50, 3*p5.HALF_PI, (treeHeight+1)*lengthIncrement, 0, treeHeight)
    }

    treeCoords.forEach((coords) => {
      drawLine(p5, coords[0], coords[1], coords[2], coords[3], coords[4], treeHeight)
    })
    
  
  }

  function drawLine(p5, x, y, xEnd, yEnd, counter, treeHeight) {
    let width = treeHeight - counter
    p5.strokeWeight(width)
    p5.stroke(colors[counter])
    p5.line(x, y, xEnd, yEnd)
  }

  function newCoords(p5, x, y, angle, length) {
    let xEnd = x + p5.cos(angle) * length
    let yEnd = y + p5.sin(angle) * length
    
    return [xEnd, yEnd]
  }

  function fractalTree(p5, x, y, angle, length, counter, treeHeight) {
    let angle1 = angle + p5.random(0, 0.1 + counter / 80) * p5.PI
    let angle2 = angle - p5.random(0, 0.1 + counter / 80) * p5.PI

    let newLength = length - lengthIncrement

    let coords1 = newCoords(p5, x, y, angle1, newLength)
    let coords2 = newCoords(p5, x, y, angle2, newLength)
    
    treeCoords.push([x, y, coords1[0], coords1[1], counter])
    treeCoords.push([x, y, coords2[0], coords2[1], counter])

    counter += 1

    if (counter < treeHeight) {
      fractalTree(p5, coords1[0], coords1[1], angle1, newLength, counter, treeHeight)
      fractalTree(p5, coords2[0], coords2[1], angle2, newLength, counter, treeHeight)
    }
  }
  
  

  return (
    
    <Container className='fractal-container'>
      <Row>
        <Col className='fractaltree' xs={10}>
          <Sketch setup={setup} draw={draw}/>
        </Col>
        <Col className='fractal-settings'>
        <ThemeProvider theme={theme}>
        <TextField id="outlined-basic" label="Number of branches" variant="outlined" onKeyPress={(ev) => {handleTreeHeight(ev)}}/>
        </ThemeProvider>
        </Col>
      </Row>
    </Container>
    
  )
  
}


export default FractalTree

