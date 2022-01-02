import React, { useEffect, useState } from 'react'
import Sketch from 'react-p5'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}


function Snake() {

  const { width, height } = useWindowDimensions()

  const setup = (p5, canvasParentRef) => {
    const cnv = p5.createCanvas(width, height - 100).parent(canvasParentRef)
    cnv.keyReleased = (event) => {
      console.log(event);
    };
  }

  let x = 0
  let y = 0

  let yIncrement = 0
  let xIncrement = 10
  let direction = 'right'


  function draw(p5) {
    p5.background(0);

    p5.square(x, y, 10)
    updatePosition(p5)
  
  }

  function updatePosition(p5) {
    if (direction === "right") {
      yIncrement = 0
      xIncrement = 1
      
    }
    if (direction === "left") {
      yIncrement = 0
      xIncrement = -1
    }
    if (direction === "up") {
      yIncrement = -1
      xIncrement = 0
    }
    if (direction === "down") {
      yIncrement = 1
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
    <div  className='snake'>
      <Sketch setup={setup} draw={draw} keyPressed={keyPressed}/>
    </div>
  )
}


export default Snake

