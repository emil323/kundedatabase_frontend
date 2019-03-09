import React, { Component } from 'react'
import { Jumbotron, Nav, Navbar, NavItem, NavbarBrand, Collapse, Button, Card, CardTitle, CardBody } from 'reactstrap'
import './CollapsibleHeader.css'
import ArrowDropDown from '../../Assets/Icons/arrow_drop_down.png'

// Placeholder image. Logo must be obtained from database
import Logo from '../../Assets/ClientLogos/tronrud.png'

class CollapsibleHeader extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            collapse: false
        }
    }

    toggle() {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    render() {
        
        const { options } = this.props
        const optionsList = options.map(option => {
            return (
                <li className="collapsible-header-li"><Button color="primary" className="" onClick={option.function} key={option.key}>{option.text}</Button></li>
            )
        })
        

        return (
            <div>
                
                {/*
                    <Button color="primary" className="btn-vector collapsible-header-toggle" onClick={this.toggle}><img src={ArrowDropDown} alt="Arrow Drop Down" /></Button>


                    <Collapse isOpen={this.state.collapse}>
                        <Jumbotron className="">
                            <img src={Logo} className="collapsible-header-bckgrd" />
                            <ul className="collapsible-header-ul">
                                {optionsList}
                            </ul>

                        </Jumbotron>
                    </Collapse> */}

            </div>


        )
    }

}

export default CollapsibleHeader