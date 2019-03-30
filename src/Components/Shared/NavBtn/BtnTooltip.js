import React, { Component } from 'react'
import { Tooltip } from 'reactstrap'
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'
import './NavBtn.css'

class BtnTooltip extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        this.toggle = this.toggle.bind(this)
    }
    toggle() {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <Desktop>
                <Tooltip className="tooltiptest" hideArrow placement="auto-end" isOpen={this.state.open} target={this.props.targetId} toggle={this.toggle}>
                    {this.props.descr}
                </Tooltip>
            </Desktop>
        )
    }
}

export default BtnTooltip





