import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5'
import { TextField, Grid, Checkbox, FormControlLabel, Button, FormHelperText, useMediaQuery } from '@mui/material'

import FractalTree from './FractalTree'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

const fractalTree = new FractalTree()

function FractalTreeScreen() {

  const [p5, setP5] = useState()
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  
  const [treeCounter, setTreeCounter] = useState(0)
  const [treeCoords, setTreeCoords] = useState([])
  const [animationCounter, setAnimationCounter] = useState(0)

  const [lengthIncrement, setLengthIncrement] = useState()
  const [nBranches, setNBranches] = useState()
  
  const [treeHeight, setTreeHeight] = useState(5)
  const [heightError, setHeightError] = useState('')

  const [treeColors, setTreeColors] = useState(["#211300", "#211300", "green"])
  const [colors, setColors] = useState()
  const [colorError, setColorError] = useState("")

  const [animation, setAnimation] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [animationTime, setAnimationTime] = useState(3)
  const [animationTimeError, setAnimationTimeError] = useState("")
  const [branchesPerFrame, setBranchesPerFrame] = useState(1)

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

  const confirmAnimationTime = ((event) => {
    let input = event.target.value
    setAnimationTimeError("")
    if (isNaN(input)) {
      setAnimationTimeError("Please enter a number")
      return
    }
    if (parseInt(input) < 1) {
      setAnimationTimeError("Please enter a number greater than 1")
      return
    }
    setAnimationTime(parseInt(input))
  })

  const generateTree = (() => {
    if ((heightError === "" || heightError === "Waiting times grow exponentially") && colorError === "") {
      setTreeCounter(treeCounter + 1)
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

  // Update color gradient when new colors are provied
  // useEffect(() => {
  //   findColors()
  // }, [treeColors])

  // Generate new tree
  useEffect(() => {
    //fractalTree.reset()
    



    setTreeCoords([])
    setAnimationCounter(0)
    setLengthIncrement(1.6 * height / (treeHeight * treeHeight))
    let branches = Math.pow(2, treeHeight+1)
    setBranchesPerFrame(branches / (60 * animationTime))
    setNBranches(branches)
    if (p5) {
      p5.loop()
    }
  }, [treeCounter])


  

  const setup = (p5, canvasParentRef) => {

    let proportion
    if (smallScreen) {
      proportion = 2 / 3
    } else {
      proportion = 5 / 6
    }
    
    p5.createCanvas(window.innerWidth * proportion, window.innerHeight - 50).parent(canvasParentRef)
    fractalTree.init(p5, treeHeight, p5.width, p5.height)
    findColors()

    setHeight(window.innerHeight)
    setWidth(window.innerWidth * proportion)

    setTreeCounter(treeCounter + 1)
  }

  function draw(p5) {
    // if (treeCoords.length === 0 && width && colors.length === treeHeight && animationCounter === 0) {
    //   p5.clear()
    //   fractalTree(p5, p5.width/2, p5.height-50, 3*p5.HALF_PI, (treeHeight+1)*lengthIncrement, 0, treeHeight)
      
    //   console.log("yo")

    //   if (!animation) {
    //     p5.noLoop()
    //   } else {
    //     setAnimating(true)
    //   }
    // }

    if (treeCoords.length === 0) {
      p5.clear()
      fractalTree.calculateCoords(fractalTree.width / 2, fractalTree.height - 50, 1.5 * Math.PI, (fractalTree.treeHeight + 1) * fractalTree.lengthIncrement, 0)
    }

    p5.strokeWeight(10)
    fractalTree.drawLine(p5.width/2, p5.height, p5.width/2, p5.height-50, 0)

    fractalTree.draw()
    p5.noLoop()
    // } else {
    //   setAnimationCounter(parseInt(animationCounter + branchesPerFrame))
    //   treeCoords.slice(animationCounter - branchesPerFrame, animationCounter).forEach((coords) => {
    //     drawLine(p5, coords[0], coords[1], coords[2], coords[3], coords[4], treeHeight)
    //   })

    //   if (animationCounter > nBranches) {
    //     p5.noLoop()
    //     setAnimating(false)
    //   }
    // }
  }

  return (
    <Grid container style={{borderTop: "2px solid #212529"}}>
        <Grid item xs={8} sm={10}>
          <Sketch setup={setup} draw={draw}/>
        </Grid>
        <Grid item sm={2} xs={4} sx={{borderLeft: "2px solid #212529", display:"flex", flexDirection:"column"}}>
          <TextField 
            error={heightError !== ""}
            id="n-branches" 
            label="Number of branches" 
            helperText={heightError}
            variant="outlined" 
            disabled={animating}
            onChange={(ev) => confirmHeight(ev)}
            sx={{m:2}}
          />
          <TextField 
            error={colorError !== ""}
            helperText={colorError === "" ? "Eg. blue, lightblue, white": colorError}
            id="colors" 
            label="Colors" 
            variant="outlined" 
            disabled={animating}
            onChange={(ev) => confirmColors(ev)}
            sx={{m:2}}
          />

          <FormControlLabel 
            label="Animation" 
            sx={{color:"gray", m:1}}
            control={
          <Checkbox
            defaultChecked={true}
            onChange={() => {
              setAnimation(!animation)
              setAnimating(false)}}
          />
          }
          />
          <FormHelperText sx={{mt:-1, ml:7}}>Click again to stop animating</FormHelperText>
          <TextField 
            error={animationTimeError !== ""}
            label="Animation time (s)"
            helperText={animationTimeError}
            disabled={!animation || animating}
            onChange={(ev) => confirmAnimationTime(ev)}
            sx = {{m:2}}
          />
          <Button
            variant="outlined"
            sx={{m:2}}
            onClick={() => generateTree()}
          >
            Generate
          </Button>
          
        </Grid >
    </Grid>
  )
}


export default FractalTreeScreen

