import React from 'react';
import {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Logo from '../../Assets/Img/ecit-logo.png';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand><img src={Logo} alt="ECIT Dokumentpartner Logo"></img></NavbarBrand>
                </Navbar>
               <h1>Hello World</h1>
            </div>
            
        );
    }
}

export default Header;