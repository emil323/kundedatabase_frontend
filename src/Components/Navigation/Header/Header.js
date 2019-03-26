import React from 'react'
import { Collapse, Nav, Navbar, NavItem, NavLink, NavbarToggler, NavbarBrand } from 'reactstrap'
import { Link } from 'react-router-dom'
import Hamburger from 'react-hamburger-menu'
import './Header.css'
import Menu from '../Menu/Menu'
import NavBtn from '../../Shared/NavBtn/NavBtn'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { isAdmin, AdminUser, RegularUser } from '../../Helpers/AdminChecker/AdminChecker'
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'

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
				<Navbar className="mainHeader" expand="md">
					<Mobile>

						<a href='https://www.office.com/apps?auth=2&home=1' target="_blank">
							<NavBtn
								img="Apps"
								action="https://www.office.com/apps?auth=2&home=1"
							/>
						</a>
					</Mobile>

					<NavbarBrand href="/">
						<Link to={`/`}>
							<button className="btn-vector btn-vector-brand"><img className="btn-vector-img btn-brand-img" src="/img/ecit-logo.png" /></button></Link>
					</NavbarBrand>

					<Mobile>
						<Hamburger
							className="hamburger"
							isOpen={this.state.open}
							menuClicked={this.toggleHamburger}
							color='white'
							width={30}
							height={15}
							strokeWidth={3}
							animationDuration={0.3} />
					</Mobile>

					<Collapse isOpen={this.state.open} onClick={this.toggleHamburger} navbar>
						<Nav className="ml-auto" navbar>
							<Mobile>
								<Menu />
							</Mobile>

							<Desktop>
								{/** Vises kun dersom administrator */}
								<AdminUser>
									<NavItem><Link to="/" className="router-link-nav"><NavLink><NavBtn hasTooltip contextId="home" contextClass={"navbar"} img="Home" descr="Hjem"  /></NavLink></Link></NavItem>
									<NavItem><Link to="/clients" className="router-link-nav"><NavLink><NavBtn hasTooltip contextId="clients" contextClass={"navbar"} img="Clients" descr="Kunder"  /></NavLink></Link></NavItem>
									<NavItem><Link to="/users" className="router-link-nav"><NavLink><NavBtn hasTooltip contextId="user-access" contextClass={"navbar"} img="UserAccess" descr="Brukere"  /></NavLink></Link></NavItem>
									<NavItem><Link to="/accesslog" className="router-link-nav"><NavLink ><NavBtn hasTooltip contextId="accesslog-navbar" contextClass={"navbar"} img="AccessLogWhite" descr="Adgangslogg"  /></NavLink></Link></NavItem>
									<NavItem><Link to="/settings" className="router-link-nav"><NavLink className="lastElement"><NavBtn hasTooltip contextId="settings" contextClass={"navbar"} img="Settings" descr="Innstillinger"  /></NavLink></Link></NavItem>
									<NavItem><NavLink><a href='https://www.office.com/apps?auth=2&home=1' target="_blank">
										<NavBtn
											hasTooltip
											contextId="apps"
											img="Apps"
											contextClass={"navbar"}
											descr="Apps"
											
										/>
									</a></NavLink></NavItem>
								</AdminUser>
								{/** Vises kun dersom vanlig bruker */}
								<RegularUser>
									<NavItem><Link to="/clients" className="router-link-nav"><NavLink><NavBtn hasTooltip contextId="home" contextClass={"navbar"} img="Home" descr="Hjem" showDescr /></NavLink></Link></NavItem>
									<NavItem><Link to="/clients" className="router-link-nav"><NavLink><NavBtn hasTooltip contextId="clients" contextClass={"navbar"} img="Clients" descr="Kunder" showDescr /></NavLink></Link></NavItem>
									<NavItem><NavLink><a href='https://www.office.com/apps?auth=2&home=1' target="_blank">
										<NavBtn
											hasTooltip
											contextId="apps"
											img="Apps"
											contextClass={"navbar"}
											descr="Apps"
											showDescr
										/>
									</a></NavLink></NavItem>
								</RegularUser>
							</Desktop>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		)
	}
}