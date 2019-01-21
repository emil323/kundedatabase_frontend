import React from 'react'
import {Component} from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap'
import { Link , Router} from "react-router-dom"

class Menu extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

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