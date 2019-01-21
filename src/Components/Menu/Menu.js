import React from 'react'
import {Component} from 'react'
import {NavItem} from 'reactstrap'
import { Link } from "react-router-dom"

class Menu extends Component {

    render() {
        return (
            <div className="menu">    
                    <NavItem><p>Kristoffer Heia</p></NavItem>      
                    <NavItem><Link to="/" >Hjem</Link></NavItem>
                    <NavItem><Link to="/favourites">Favoritter</Link></NavItem>
                    <NavItem><Link to="/clients" >Kunder</Link></NavItem>
            </div>
            
        )
    }
}



export default Menu