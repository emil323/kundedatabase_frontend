import React from 'react'
import {Component} from 'react'
import {NavItem} from 'reactstrap'
import { Link } from "react-router-dom"

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null
        }
    }
    

    componentDidMount() {
        const names= ["Jan Helgesen", "Joakim Selvik", "Mattis Jørgensen", "Kristoffer Heia","Emil Kalstø"]
        this.setState({name:names[Math.floor(Math.random() * names.length)]})
    }

    render() {
        return (
            <div className="menu">    
                <NavItem><p>{this.state.name}</p></NavItem>      
                <NavItem><Link to="/" >Hjem</Link></NavItem>
                <NavItem><Link to="/favourites">Favoritter</Link></NavItem>
                <NavItem><Link to="/clients" >Kunder</Link></NavItem>
            </div>
            
        )
    }
}



export default Menu