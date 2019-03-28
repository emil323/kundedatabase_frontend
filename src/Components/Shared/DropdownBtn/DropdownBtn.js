import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DropdownBtn.css'
import NavBtn from '../NavBtn/NavBtn'

export default class DropdownBtn extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            tekst: ''
        };
    }

    toggle(e) {
        e.preventDefault()
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


    render() {
        const { options } = this.props;
        const optionsList = options.map(option => {
            return option.isHeader !== 0 ? (
                <DropdownItem header key={option.key}>
                    {option.tekst}
                </DropdownItem>
            ) : <DropdownItem onClick={option.function} key={option.key}>
                    {option.tekst}
                </DropdownItem>;


        })
        return (
            <Dropdown className="btn-dropdown" toggle={this.toggle} isOpen={this.state.dropdownOpen} direction="left">
                <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}>
                    <NavBtn img="KebabVert" contextClass="kebab"/>
                </DropdownToggle>
                <DropdownMenu>
                    {optionsList}
                </DropdownMenu>
            </Dropdown >

        )
    }
}