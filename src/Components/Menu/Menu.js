import React from 'react'
import {Component} from 'react'
import {NavItem, NavLink, } from 'reactstrap'
import { Link } from "react-router-dom"
import { authContext } from './../../Auth/adalConfig';
import './Menu.css';

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
                <NavItem><p>{this.state.email}</p></NavItem>   
                <NavItem><Link onClick={this.props.closeHamburger} to="/" ><NavLink>HJEM</NavLink></Link></NavItem>
                <NavItem><Link onClick={this.props.closeHamburger} to="/clients" ><NavLink>KUNDER</NavLink></Link></NavItem>
                <NavItem><Link onClick={this.props.closeHamburger} to="/useraccess" ><NavLink>BRUKERTILGANG</NavLink></Link></NavItem>
                <NavItem><Link onClick={this.props.closeHamburger} to="/accesslog" ><NavLink className="lastElement">ADGANGSLOGG</NavLink></Link></NavItem>
            </div>
            
        )
    }
}

export default Menu