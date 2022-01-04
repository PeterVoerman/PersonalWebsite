import React, { Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

const NavigationBar = lazy(() => import('./components/NavigationBar/NavigationBar'))
const Home = lazy(() => import('./components/home/home'))
const WhatsAppAnalyzer = lazy(() => import('./components/whatsappAnalyzer/WhatsAppAnalyzer'))
const SnakeField = lazy(() => import('./components/Snake/SnakeField'))
const FractalTree = lazy(() => import('./components/FractalTree/FractalTree'))
const SolarSystem = lazy(() => import('./components/SolarSystem/SolarSystem'))

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.render(
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
      <NavigationBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/snake' element={<SnakeField/>}/>
        <Route path='/fractaltree' element={<FractalTree/>}/>
        <Route path='/solarsystem' element={<SolarSystem/>}/>
        <Route path="/whatsappanalyzer" element={<WhatsAppAnalyzer/>}/>
      </Routes>
      </ThemeProvider>
      </Suspense>
    </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
