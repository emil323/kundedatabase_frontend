import React from 'react'
import {Component} from 'react'
import {NavItem} from 'reactstrap'
import { Link } from "react-router-dom"
import { authContext } from './../../Auth/adalConfig';

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
                <NavItem>{this.state.name}</NavItem>      
                <NavItem><p>{this.state.email}</p></NavItem>   
                <NavItem><Link to="/" >Hjem</Link></NavItem>
                <NavItem><Link to="/favourites">Favoritter</Link></NavItem>
                <NavItem><Link to="/clients" >Kunder</Link></NavItem>
                <NavItem><Link to="/newfile" >Legg til dokument</Link></NavItem>
                <NavItem><Link to="/files" >files</Link></NavItem>
            </div>
            
        )
    }
}

export default Menu