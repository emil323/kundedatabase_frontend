import React from 'react'
import { Component } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import Logo from '../../Assets/Img/ecit-logo.png'
import './Header.css'
import Menu from './../Menu/Menu'

export default class Example extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
        collapsed: true,
        width: window.innerWidth
      };
    }
  
    toggleNavbar() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/" className="mr-auto"><img src={Logo} /></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar className="hidden-lg">
              <Nav navbar className="hidden-lg hidden-md hidden-sm">
                <Menu/>
              </Nav>
            </Collapse>
            
          </Navbar>
        </div>
      );
    }
}