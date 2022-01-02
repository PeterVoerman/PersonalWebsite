import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  NavigationBar,
  Home,
  WhatsAppAnalyzer,
  Snake,
  FractalTree
} from './components'

ReactDOM.render(
  <Router>
    <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/snake' element={<Snake/>}/>
      <Route path='/fractaltree' element={<FractalTree/>}/>
      <Route path="/whatsappanalyzer" element={<WhatsAppAnalyzer/>}/>
    </Routes>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
