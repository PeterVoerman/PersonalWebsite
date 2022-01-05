import React, { useState } from 'react'
import Sketch from 'react-p5'

import Snake from './snake'
import Fruit from './fruit'

function SnakeField() {
  const [snake, setSnake] = useState()
  const [fruit, setFruit] = useState()
  const [mouseStart, setMouseStart] = useState({"x":0, "y":0})
  const [frameRate, setFrameRate] = useState(5)
  let dirChanged

  const setup = (p5, canvasParentRef) => {
    let sizeRatio = 30
    let width = Math.round((window.innerWidth - sizeRatio / 2) / sizeRatio) * sizeRatio
    let size = width / sizeRatio
    let height = Math.round((window.innerHeight - size * 1.5) / size) * size

    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.frameRate(frameRate)
    setSnake(new Snake(5, 5, p5.width, p5.height, p5.width/sizeRatio, p5))
    setFruit(new Fruit(p5.width, p5.height, p5.width/sizeRatio, p5))
}

  const draw = (p5) => {
    dirChanged = false
    p5.background(25);

    snake.move()
    if (!snake.isAlive()) {
      
      p5.noLoop()
    }

    if (snake.body[0].x === fruit.x && snake.body[0].y === fruit.y) {
      snake.addBody()
      fruit.newLocation(snake)
    }

    snake.draw()
    fruit.draw()
  }

  const keyPressed = (p5) => {
    switch (p5.key) {
      case "ArrowLeft":
        if (snake.dir.x === 0 && !dirChanged) {
          snake.dir.x = -1
          snake.dir.y = 0
          dirChanged = true
        }
        break;
      case "ArrowRight":
        if (snake.dir.x === 0 && !dirChanged) {
          snake.dir.x = 1
          snake.dir.y = 0
          dirChanged = true
        }
        break;
      case "ArrowUp":
        if (snake.dir.y === 0 && !dirChanged) {
          snake.dir.x = 0
          snake.dir.y = -1
          dirChanged = true
        }
        break;
      case "ArrowDown":
        if (snake.dir.y === 0 && !dirChanged) {
          snake.dir.x = 0
          snake.dir.y = 1
          dirChanged = true
        }
        break;
      case " ":
        snake.addBody()
        break
    }
  }

  const touchStarted = (p5) => {
    setMouseStart({"x":p5.mouseX, "y":p5.mouseY})
  }

  const touchEnded = (p5) => {
    let distX = p5.mouseX - mouseStart["x"]
    let distY = p5.mouseY - mouseStart["y"] 

    if (Math.abs(distX) > Math.abs(distY) && distX > 0) {
      keyPressed({"key":"ArrowRight"})
    }
    if (Math.abs(distX) > Math.abs(distY) && distX < 0) {
      keyPressed({"key":"ArrowLeft"})
    }
    if (Math.abs(distX) < Math.abs(distY) && distY > 0) {
      keyPressed({"key":"ArrowDown"})
    }
    if (Math.abs(distX) < Math.abs(distY) && distY < 0) {
      keyPressed({"key":"ArrowUp"})
    }
  }
  
  
  return (
    <div className='snake'>
      <Sketch 
        setup={setup} 
        draw={draw} 
        keyPressed={keyPressed} 
        mousePressed={touchStarted} 
        touchEnded={touchEnded}
      />
    </div>
  )
}


export default SnakeField

