import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink as Link } from "react-router-dom";
import './NavigationBar.css'


const NavigationBar = () => {
  return (
    <div>
      <Navbar className="navbar">
        <Container className="nav-container">
          <Link className='logo' to='/'>Peter Voerman</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navmenu">
            <Nav>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/whatsappanalyzer">WhatsApp Analyzer</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </div>
  );
};
export default NavigationBar;
