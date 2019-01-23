import React from 'react'
import { Collapse, Nav, Navbar, NavbarBrand} from 'reactstrap'
import Hamburger from 'react-hamburger-menu'
import './Header.css'
import Menu from './../Menu/Menu'

export default class Header extends React.Component {

    constructor(props) {
      super(props);
  
      this.toggleHamburger = this.toggleHamburger.bind(this);
      this.state = {
        open: false
      };
    }
  
    toggleHamburger() {
      this.setState({
        open: !this.state.open
      })
    }
    render() {
      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <div class="hidden-lg hidden-md hidden-sm">
              <Hamburger
                isOpen={this.state.open}
                menuClicked={this.toggleHamburger}
                width={30}
                height={20}
                strokeWidth={3}
                animationDuration={0.3}
              />
            </div>
            <NavbarBrand href="/" className="mx-auto"><img alt="Logo" src="img/ecit-logo.png" /></NavbarBrand>
          
            <Collapse isOpen={this.state.open} navbar className="hidden-lg">
              <Nav navbar className="hidden-lg hidden-md hidden-sm">
                <Menu/>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
    }
}