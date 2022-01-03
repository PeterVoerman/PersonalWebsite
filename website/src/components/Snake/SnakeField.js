import React, { useEffect, useState } from 'react'
import Sketch from 'react-p5'

import Snake from './snake'

import './Snake.css'

function SnakeField() {

  const [p5, setP5] = useState();
  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [scale, setScale] = useState(35)
  const [snake, setSnake] = useState()
  const [canvasHeight, setCanvasHeight] = useState()
  


  const setup = (p5, canvasParentRef) => {
    // set to state
    setP5(p5)
    setCanvasHeight(Math.round((window.innerHeight - 100) / 50) * 50)
    p5.createCanvas(window.innerWidth, Math.round((window.innerHeight - 100) / 50) * 50).parent(canvasParentRef)
    setHeight(window.innerHeight - 100)
    setWidth(window.innerWidth)
    p5.frameRate(5)
    setSnake(new Snake(0, 0, p5))
}

  function draw(p5) {
    p5.background(25);
   

    snake.move()
    if (!snake.isAlive(width, canvasHeight)) {
      p5.noLoop()
    }

    snake.draw()
  }

  function keyPressed(p5) {
    switch (p5.key) {
      case "ArrowLeft":
        if (snake.dir.x === 0) {
          snake.dir.x = -1
          snake.dir.y = 0
        }
        break;
      case "ArrowRight":
        if (snake.dir.x === 0) {
          snake.dir.x = 1
          snake.dir.y = 0
        }
        break;
      case "ArrowUp":
        if (snake.dir.y === 0) {
          snake.dir.x = 0
          snake.dir.y = -1
        }
        break;
      case "ArrowDown":
        if (snake.dir.y === 0) {
          snake.dir.x = 0
          snake.dir.y = 1
        }
        break;
      case " ":
        snake.addBody()
        break
    }
  }
  
  return (
    <div className='snake'>
      <Sketch  setup={setup} draw={draw} keyPressed={keyPressed}/>
    </div>
  )
}


export default SnakeField

