import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5'
import { TextField, Grid } from '@mui/material'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

function FractalTree() {
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [treeHeightCounter, setTreeHeightCounter] = useState({"height":13, "counter":0})
  const [p5, setP5] = useState()
  const [input, setInput] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [numberColors, setNumberColors] = useState(2)
  const [treeColors, setTreeColors] = useState(["#211300", "#211300", "green"])
  const [colors, setColors] = useState()

  const handleTreeHeight = (event) => {
    if (event.key === 'Enter') {
      setTreeHeightCounter({"height":parseInt(event.target.value), "counter":treeHeightCounter['counter'] + 1})
    }
  }

  const handleNumberColors = (event) => {
    let colorInput = event.target.value
    if (!isNaN(colorInput)) {
      console.log(event.target.value)
    }
  }

  const findColors = () => {
    let colorList = []
    console.log(treeColors)

    gradient.setNumberRange(1, treeHeightCounter["height"])
    gradient.setSpectrum.apply(this, treeColors)
    for (let i = 1; i <= treeHeightCounter["height"]; i++) {
      let color = "#" + gradient.colorAt(i)
      colorList.push(color)
    }
    
    setColors(colorList)
    
  }



  useEffect(() => {
    if (parseInt(input) > 20) {
      setErrorMessage("You'll have to wait a long time with a high number of branches")
    }
  }, [input])

  useEffect(() => {
    if (parseInt(input) < 20 && errorMessage) {
      setErrorMessage("")
    }
  }, [input, errorMessage])

  useEffect(() => {
    treeCoords = []
    if (p5) {
      p5.loop()
    }
  }, [treeHeightCounter])

  let lengthIncrement
  let treeCoords = []

  useEffect(() => {
    findColors()
    setTreeHeightCounter({"height":treeHeightCounter["height"], "counter":treeHeightCounter['counter'] + 1})
  }, [treeColors])
  

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth * 5/6, window.innerHeight).parent(canvasParentRef)
    setP5(p5)
    setHeight(window.innerHeight)
    setWidth(window.innerWidth * 5/6)
  }

  function draw(p5) {
    findColors()
    let treeHeight = treeHeightCounter['height']
    lengthIncrement = 1.7 * height / (treeHeight * treeHeight)
    p5.clear()
    p5.strokeWeight(10)
    drawLine(p5, p5.width/2, p5.height, p5.width/2, p5.height-50, 0, treeHeight+1)

    if (treeCoords.length === 0 && width && colors.length === treeHeight) {
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
    <Grid container style={{borderTop: "2px solid #212529"}}>
        <Grid item xs={10}>
          <Sketch setup={setup} draw={draw}/>
        </Grid>
        <Grid item xs={2} style={{borderLeft: "2px solid #212529", alignItems:"center"}}>
          <TextField 
            error={errorMessage !== ""}
            id="n-branches" 
            label="Number of branches" 
            helperText={errorMessage}
            variant="outlined" 
            onChange={(ev) => {setInput(ev.target.value)}}
            onKeyDown={(ev) => {handleTreeHeight(ev)}}
            style={{margin:'1vw'}}
          />
          <TextField 
            id="colors" 
            label="Colors" 
            variant="outlined" 
            helperText="color,color,..."
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                setTreeColors(ev.target.value.split(","))
                }
            }}
            style={{margin:'1vw'}}
          />
        </Grid >
    </Grid>
  )
}


export default FractalTree

