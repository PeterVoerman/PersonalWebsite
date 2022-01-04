import React, { useState } from 'react'
import Sketch from 'react-p5'
import { Grid } from '@mui/material'

import Planet from './planet'

function SolarSystem() {

  const [planet, setPlanet] = useState()

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    setPlanet(new Planet(p5.width / 2, p5.height / 2, 100, "yellow", p5))
    
  }

  let x
  let y
  let xSpeed
  let ySpeed
  let mouseSpeed

  const draw = (p5) => {
    p5.clear()
    x = p5.mouseX 
    y = p5.mouseY

    xSpeed = (p5.winMouseX - p5.pwinMouseX)
    ySpeed = (p5.winMouseY - p5.pwinMouseY)

    mouseSpeed = Math.sqrt(xSpeed ** 2 + ySpeed ** 2)

    planet.x = x
    planet.y = y
    planet.draw()
  }

  return (
    <Grid container container sx={{position:"absolute", top:"0px", right:"0px"}}>
      <Grid item xs={12}>
      <Sketch setup={setup} draw={draw}/>
      </Grid>
    </Grid>
  )
}

export default SolarSystem