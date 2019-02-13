import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DropdownBtn.css'

export default class DropdownBtn extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            tekst: 'tekst'
        };


    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


    render() {
        const { options } = this.props;
        const optionsList = options.map(option => {
            return option.isHeader !== 0 ? (
                <DropdownItem header key={option.key}>{option.tekst}</DropdownItem>
            ) : <DropdownItem onClick={option.function} key={option.key}>{option.tekst}<span className="glyphicon glyphicon-envelope"></span></DropdownItem>;


        })
        return (
            <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="primary " />
                <DropdownMenu>
                    {optionsList}
                </DropdownMenu>
            </ButtonDropdown>
        )
    }
}