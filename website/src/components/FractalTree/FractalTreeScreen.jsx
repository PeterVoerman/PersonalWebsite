import React, { useState } from 'react'
import Sketch from 'react-p5'
import { TextField, Grid, FormControlLabel, Button, FormHelperText, useMediaQuery, Switch, Slider } from '@mui/material'

import FractalTree from './FractalTree'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

const fractalTree = new FractalTree()

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: 'Fast',
  },
  {
    value: 100,
    label: 'Slow',
  },
];

function FractalTreeScreen() {  
  const [treeHeight, setTreeHeight] = useState(13)
  const [heightError, setHeightError] = useState('')

  const [treeColors, setTreeColors] = useState(["#211300", "#211300", "green"])
  const [colorError, setColorError] = useState("")

  const [animation, setAnimation] = useState(true)
  const [animationTime, setAnimationTime] = useState(1)

  const smallScreen = !useMediaQuery('(min-width:600px)')

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
    }
    if (parseInt(input) < 2) {
      setHeightError("Please enter a number greater than 1")
      return
    }
    setTreeHeight(parseInt(input))
  })

  // Confirm colors is valid input
  const confirmColors = ((event) => {
    let error = false
    let colorArray = event.target.value.replace(/\s+/g, '').split(",")
    setColorError("")
    colorArray.forEach((color) => {
      let s = new Option().style
      s.color = color

      if (s.color === '') {
        setColorError("Please enter valid colors")
        error = true
      }
    })

    if (!error) {
      if (colorArray.length === 1) {
        colorArray.push(colorArray[0])
      }
      setTreeColors(colorArray)
    }
  })

  const generateTree = (() => {
    if ((heightError === "" || heightError === "Waiting times grow exponentially") && colorError === "") {
      fractalTree.initTree(treeHeight, animationTime)
      findColors()
      fractalTree.calculateCoords(fractalTree.p5.width / 2, fractalTree.p5.height - 50, 1.5 * Math.PI, (fractalTree.treeHeight + 1) * fractalTree.lengthIncrement, 0)
      fractalTree.p5.clear()
      fractalTree.p5.loop()
    }
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
    
    fractalTree.setColors(colorList)
  }  

  const setup = (p5, canvasParentRef) => {

    let proportion
    if (smallScreen) {
      proportion = 2 / 3
    } else {
      proportion = 5 / 6
    }
    
    p5.createCanvas(window.innerWidth * proportion, window.innerHeight - 50).parent(canvasParentRef)
    fractalTree.initP5(p5, p5.height)
    generateTree()
    findColors()
  }

  function draw(p5) {

    p5.strokeWeight(10)
    fractalTree.drawLine(p5.width/2, p5.height, p5.width/2, p5.height-50, 0)

    if (!animation) {
      fractalTree.animationCounter = -1
      p5.noLoop()
      if (!fractalTree.animated) {
        fractalTree.draw()
      }
    } else {
      fractalTree.draw()
      fractalTree.animationCounter += fractalTree.branchesPerFrame
      
      if (fractalTree.animationCounter > fractalTree.nBranches) {
        p5.noLoop()
      }
    }
  }

  return (
    <Grid container style={{borderTop: "2px solid #212529"}}>
        <Grid item xs={8} sm={10}>
          <Sketch setup={setup} draw={draw}/>
        </Grid>
        <Grid 
          item 
          sm={2} 
          xs={4} 
          sx={{borderLeft: "2px solid #212529", display:"flex", flexDirection:"column", background:"black"}}>
          <TextField 
            error={heightError !== ""}
            id="n-branches" 
            label="Number of branches" 
            helperText={heightError}
            variant="outlined" 
            onChange={(ev) => confirmHeight(ev)}
            sx={{m:2}}
          />
          <TextField 
            error={colorError !== ""}
            helperText={colorError === "" ? "Eg. blue, lightblue, white": colorError}
            id="colors" 
            label="Colors" 
            variant="outlined" 
            onChange={(ev) => confirmColors(ev)}
            sx={{m:2}}
          />
          <FormControlLabel 
            label="Animation" 
            sx={{color:"gray", m:{xs:0, sm:1}}}
            control={
          <Switch
            sx={{m:{xs:0,sm:1}}}
            defaultChecked={true}
            onChange={() => {setAnimation(!animation)}}
          />
          }
          />
          <FormHelperText 
            sx={{mt:{sm:-1}, ml:{xs:3, sm:11}}}>
            Click again to stop animating
          </FormHelperText>
          <Slider 
            sx={{m:3, width:{xs:"60%", sm:"85%"}}}
            disabled={!animation}
            getAriaValueText={valuetext}
            marks={marks}
            onChange={(ev=>setAnimationTime(ev.target.value * 2 + 1))}/>
          <Button
            variant="outlined"
            sx={{m:2}}
            onClick={() => generateTree()}
          >
            Generate
          </Button>
        </Grid>
    </Grid>
  )
}


export default FractalTreeScreen

