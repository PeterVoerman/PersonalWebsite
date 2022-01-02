import React from "react";

import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavBarElements";


const NavBar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/whatsappanalyzer" activeStyle>
                    WhatsApp Analyzer
                </NavLink>
            </NavMenu> 
           </Nav> 
        </>
    );
};
export default NavBar;
