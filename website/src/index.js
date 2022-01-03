import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import {
  NavigationBar,
  Home,
  WhatsAppAnalyzer,
  SnakeField,
  FractalTree
} from './components'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
    <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/snake' element={<SnakeField/>}/>
      <Route path='/fractaltree' element={<FractalTree/>}/>
      <Route path="/whatsappanalyzer" element={<WhatsAppAnalyzer/>}/>
    </Routes>
    </ThemeProvider>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
