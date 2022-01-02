import React from "react";
import { NavLink as Link } from "react-router-dom";
import './ProcessingTest.css'

function ProcessingTest() {

  return (
    <div className="links">
      <ul>
        <li>
          <Link to="/processingtest/snake">Snake</Link>
        </li>
        <li>
          <Link to="/processingtest/fractaltree">Fractal Tree</Link>
        </li>
      </ul>
    </div>
  )
}

export default ProcessingTest