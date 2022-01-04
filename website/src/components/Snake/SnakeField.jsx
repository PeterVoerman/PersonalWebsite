import React, { useState } from 'react'
import Sketch from 'react-p5'

import Snake from './snake'
import Fruit from './fruit'

function SnakeField() {
  const [snake, setSnake] = useState()
  const [fruit, setFruit] = useState()
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

  function draw(p5) {
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

  function keyPressed(p5) {
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
  
  return (
    <div className='snake'>
      <Sketch  setup={setup} draw={draw} keyPressed={keyPressed}/>
    </div>
  )
}


export default SnakeField

