import React from 'react'
import {Component} from 'react'
import {NavItem, NavLink, } from 'reactstrap'
import { Link } from "react-router-dom"
import { authContext } from '../../../API/Auth/adalConfig';
import './Menu.css';
import {isAdmin, AdminUser, RegularUser} from '../../Helpers/AdminChecker/AdminChecker'
class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            name: null
        }
    }
    
    componentDidMount() {
        this.setState({email: authContext.getCachedUser().userName,
                       name: authContext.getCachedUser().profile.name })
    }

    render() {
        return (
            <div className="menu">    
                <NavItem className="navName">{this.state.name}</NavItem>   
                {/** Eksempel på isAdmin som ternary operator */}
                <NavItem><p>{this.state.email} {isAdmin ? '(Administrator)' : ''}</p></NavItem>   
                {/** Vises kun dersom administrator */}
                <AdminUser>
                    <NavItem><Link to="/" className="router-link-nav"><NavLink>Hjem</NavLink></Link></NavItem>
                    <NavItem><Link to="/clients" className="router-link-nav"><NavLink>Kunder</NavLink></Link></NavItem>
                    <NavItem><Link to="/users" className="router-link-nav"><NavLink>Brukere</NavLink></Link></NavItem>
                    <NavItem><Link to="/accesslog" className="router-link-nav"><NavLink >Adgangslogg</NavLink></Link></NavItem>
                    <NavItem><Link to="/settings" className="router-link-nav"><NavLink className="lastElement">Innstillinger</NavLink></Link></NavItem>
                    <NavItem><Link to="/logout" className="router-link-nav"><NavLink>Logg ut</NavLink></Link></NavItem>
                </AdminUser>
                {/** Vises kun dersom vanlig bruker */}
                <RegularUser>
                    <NavItem><Link to="/" className="router-link-nav"><NavLink>Hjem</NavLink></Link></NavItem>
                    <NavItem><Link to="/clients" className="router-link-nav"><NavLink>Kunder</NavLink></Link></NavItem>
                    <NavItem><Link to="/logout" className="router-link-nav"><NavLink>Logg ut</NavLink></Link></NavItem>
                </RegularUser>
            </div>
            
        )
    }
}

export default Menu