import React, {Component } from 'react'
import { Collapse, Jumbotron, Navbar, NavbarToggler } from 'reactstrap'
import NavBtn from '../../Shared/NavBtn/NavBtn'

class StructuredDataHeader extends Component {
    constructor(props) {
        super(props)
        this.toggleCollapse = this.toggleCollapse.bind(this)

        this.state = {
            isOpen: false
        }
    }

    toggleCollapse() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return(
            <div>

            <NavBtn img="ArrowDropdownCircle" action={this.toggleCollapse} />
                 
            <Collapse isOpen={this.state.isOpen}>
            <Jumbotron className="Jumbotron-Client">
                <h1 className="display 3">{this.props.clientName}</h1>
                <hr />
                <p className="lead">Data 1</p>
                <p className="lead">Data 2</p>

            </Jumbotron>
            </Collapse>
            </div>
        )
    }


}

export default StructuredDataHeader