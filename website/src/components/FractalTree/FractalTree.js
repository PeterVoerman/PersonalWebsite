import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5'
import { TextField, Grid } from '@mui/material'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

function FractalTree() {
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [treeHeight, setTreeHeight] = useState(13)
  const [treeCounter, setTreeCounter] = useState(0)
  const [p5, setP5] = useState()
  const [heightError, setHeightError] = useState('')
  const [numberColors, setNumberColors] = useState(2)
  const [treeColors, setTreeColors] = useState(["#211300", "#211300", "green"])
  const [colors, setColors] = useState()
  const [colorError, setColorError] = useState("")


  // Confiurm tree height is valid input
  const confirmHeight = ((event) => {
    let input = event.target.value
    setHeightError("")
    if (isNaN(input)) {
      setHeightError("Please enter a number")
      return
    }
    if (parseInt(input) > 15) {
      setHeightError("Waiting times grow exponentially")
      return
    }
    if (parseInt(input) < 2) {
      setHeightError("Please enter a number greater than 1")
      return
    }
  })

  // Confirm colors is valid input
  const confirmColors = ((event) => {
    let colorArray = event.target.value.replace(/\s+/g, '').split(",")
    setColorError("")
    colorArray.forEach((color) => {
      let s = new Option().style
      s.color = color

      if (s.color === '') {
        setColorError("Please enter valid colors")
      }
    })

  })

  // find gradient for provided colors and tree height
  const findColors = () => {
    let colorList = []

    gradient.setNumberRange(1, treeHeight)
    gradient.setSpectrum.apply(this, treeColors)
    for (let i = 1; i <= treeHeight; i++) {
      let color = "#" + gradient.colorAt(i)
      colorList.push(color)
    }
    
    setColors(colorList)
  }

  // Update color gradient when new colors are provied
  useEffect(() => {
    findColors()
    setTreeCounter(treeCounter + 1)
  }, [treeColors])

  // Generate new tree
  useEffect(() => {
    treeCoords = []
    if (p5) {
      p5.loop()
    }
  }, [treeCounter])


  let lengthIncrement
  let treeCoords = []

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth * 5/6, window.innerHeight).parent(canvasParentRef)
    setP5(p5)
    setHeight(window.innerHeight)
    setWidth(window.innerWidth * 5/6)
  }

  function draw(p5) {
    findColors()
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
            error={heightError !== ""}
            id="n-branches" 
            label="Number of branches" 
            helperText={heightError}
            variant="outlined" 
            onChange={(ev) => confirmHeight(ev)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" && (heightError === "" || heightError === "Waiting times grow exponentially")) {
                setTreeHeight(parseInt(ev.target.value))
                setTreeCounter(treeCounter + 1)
              }
            }}
            style={{margin:'1vw'}}
          />
          <TextField 
            error={colorError !== ""}
            helperText={colorError === "" ? "color,color,...": colorError}
            id="colors" 
            label="Colors" 
            variant="outlined" 
            onChange={(ev) => confirmColors(ev)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" && colorError === "") {
                let colors = ev.target.value.replace(/\s+/g, '').split(",")
                if (colors.length === 1) {
                  colors.push(colors[0])
                }
                setTreeColors(colors)
                }
            }}
            style={{margin:'1vw'}}
          />
        </Grid >
    </Grid>
  )
}


export default FractalTree

