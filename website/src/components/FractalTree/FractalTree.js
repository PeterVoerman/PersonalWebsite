import React, { useEffect, useState } from 'react'
import Sketch from 'react-p5'
import Helmet from 'react-helmet'

import './fractaltree.css'

let Rainbow = require('rainbowvis.js')
let gradient = new Rainbow()

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


function FractalTree() {

  const { height, width } = useWindowDimensions();

  let treeCoords = []
  let colors = []
  let treeHeight = 15
  let lengthIncrement = height / 130

  gradient.setNumberRange(1, treeHeight)
  gradient.setSpectrum("blue", "lightblue")
  for (let i = 1; i <= treeHeight; i++) {
    let color = "#" + gradient.colorAt(i)
    colors.push(color)
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width-2, height-2).parent(canvasParentRef)
    p5.noLoop()
    
  }

  function draw(p5) {
    p5.background(0);

    p5.strokeWeight(10)
    drawLine(p5, p5.width/2, p5.height, p5.width/2, p5.height-50, 0, treeHeight+1)

    if (treeCoords.length === 0) {
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
  
  

  if (width) {
    return (
      <div  className='fractaltree'>
        <Helmet>
                <style>{'body { overflow: hidden; }'}</style>
          </Helmet>
        <Sketch setup={setup} draw={draw}/>
      </div>
    )
  }
}


export default FractalTree

