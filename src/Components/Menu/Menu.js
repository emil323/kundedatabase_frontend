import React from 'react'
import {Component} from 'react'
import {NavItem, NavLink, } from 'reactstrap'
import { Link } from "react-router-dom"
import { authContext } from './../../Auth/adalConfig';
import './Menu.css';
import {isAdmin, AdminUser, RegularUser} from '../Shared/AdminChecker/AdminChecker'
class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            name: null
        }
    }
    
    componentDidMount() {
        console.log('admin', isAdmin)
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
                    <NavItem><Link to="/" ><NavLink>HJEM</NavLink></Link></NavItem>
                    <NavItem><Link to="/clients" ><NavLink>KUNDER</NavLink></Link></NavItem>
                    <NavItem><Link to="/useraccess" ><NavLink>BRUKERTILGANG</NavLink></Link></NavItem>
                    <NavItem><Link to="/accesslog" ><NavLink className="lastElement">ADGANGSLOGG</NavLink></Link></NavItem>
                </AdminUser>
                {/** Vises kun dersom vanlig bruker */}
                <RegularUser>
                    <NavItem><Link to="/" ><NavLink>HJEM</NavLink></Link></NavItem>
                    <NavItem><Link to="/clients" ><NavLink>KUNDER</NavLink></Link></NavItem>
                </RegularUser>
            </div>
            
        )
    }
}

export default Menu