import React, { useEffect, useState } from 'react'
import Sketch from 'react-p5'
import './Snake.css'

function Snake() {

  const [p5, setP5] = useState();
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [scale, setScale] = useState(35)

  const setup = (p5, canvasParentRef) => {
    // set to state
    setP5(p5)
    p5.createCanvas(window.innerWidth, window.innerHeight - 100).parent(canvasParentRef)
    setHeight(window.innerHeight - 100)
    setWidth(window.innerWidth)
    p5.frameRate(5)
}


  let x = 0
  let y = 0

  let xIncrement
  let yIncrement

  let direction = 'right'


  function draw(p5) {
    p5.background(25);
    updatePosition(p5)

    x = p5.constrain(x, 0, width - scale)
    y = p5.constrain(y, 0, height - scale)
    //console.log(x, y)

    p5.square(x, y, scale)
    
  
  }

  function updatePosition(p5) {
    if (direction === "right") {
      yIncrement = 0
      xIncrement = 1 * scale
      
    }
    if (direction === "left") {
      yIncrement = 0
      xIncrement = -1 * scale
    }
    if (direction === "up") {
      yIncrement = -1 * scale
      xIncrement = 0
    }
    if (direction === "down") {
      yIncrement = 1 * scale
      xIncrement = 0
    }
    
    x += xIncrement
    y += yIncrement
  }

  function keyPressed(p5) {
    switch (p5.key) {
      case "ArrowLeft":
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
      case "ArrowRight":
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
      case "ArrowUp":
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      case "ArrowDown":
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
    }
  }
  
  return (
    <div className='snake'>
      <Sketch  setup={setup} draw={draw} keyPressed={keyPressed}/>
    </div>
  )
}


export default Snake

