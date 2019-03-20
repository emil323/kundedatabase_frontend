import React from 'react'
import { Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap'
import {Link} from 'react-router-dom'
import Hamburger from 'react-hamburger-menu'
import './Header.css'
import Menu from '../Menu/Menu'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

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

	closeNav() {
		if (this.state.open == true) {
			this.toggleHamburger()
		}
	}

	testFunc() {
		alert("Function ran")
	}

	render() {
		return (
			<div>
				<Navbar className="mainHeader">
					<Hamburger
						className="hamburger"
						isOpen={this.state.open}
						menuClicked={this.toggleHamburger}
						color='white'
						width={30}
						height={15}
						strokeWidth={3}
						animationDuration={0.3}
					/>
					<NavbarBrand href="/" className="mx-auto">
					<Link to={`/`}>
					<button className="btn-vector"><img className="btn-vector-img" src="/img/ecit-logo.png" /></button></Link>
					</NavbarBrand>
					<Collapse isOpen={this.state.open} onClick={this.toggleHamburger} navbar>
						<Nav navbar >
							<Menu />
						</Nav>
					</Collapse>
				</Navbar>
				<Breadcrumbs />


				
			</div>
		)
	}
}