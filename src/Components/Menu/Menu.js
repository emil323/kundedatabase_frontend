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
                <Link to="/" ><NavItem><NavLink>HJEM</NavLink></NavItem></Link>
                <Link to="/favourites"><NavItem><NavLink>FAVORITTER</NavLink></NavItem></Link>
                <Link to="/clients" ><NavItem><NavLink>KUNDER</NavLink></NavItem></Link>
                <Link to="/useraccess" ><NavItem><NavLink className="lastElement">BRUKERTILGANG</NavLink></NavItem></Link>
            </div>
            
        )
    }
}

export default Menu