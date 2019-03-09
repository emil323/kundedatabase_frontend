import React, { Component } from 'react';
import { UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DropdownBtn.css'
import KebabVert from '../../../Assets/Icons/kebab-vert.png'

export default class DropdownBtn extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            tekst: ''
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
                <DropdownItem header key={option.key}>
                    {option.tekst}
                </DropdownItem>
            ) : <DropdownItem onClick={option.function} key={option.key}>
                    {option.tekst}
                </DropdownItem>;


        })
        return (

            <UncontrolledDropdown size="md">
                <DropdownToggle
                    className="btn-vector btn-vector-kebab"
                    outline color="">
                    <img
                        className="btn-vector-img btn-vector-kebab-img"
                        src={KebabVert} /></DropdownToggle>
                <DropdownMenu>
                    {optionsList}
                </DropdownMenu>
            </UncontrolledDropdown>

        )
    }
}