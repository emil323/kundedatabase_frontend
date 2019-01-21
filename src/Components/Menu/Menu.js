import React from 'react'
import {Component} from 'react'
import {Nav,NavItem,NavLink} from 'reactstrap'

class Menu extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>                
                <NavItem><NavLink href="#">Test</NavLink></NavItem>
                <NavItem><NavLink href="#">Test</NavLink></NavItem>
                <NavItem><NavLink href="#">Test</NavLink></NavItem>
                <NavItem><NavLink href="#">Test</NavLink></NavItem>
            </div>
            
        )
    }
}



export default Menu