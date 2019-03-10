import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Collapse, ButtonGroup, Input } from 'reactstrap'
import NavBtn from '../NavBtn/NavBtn'
import { Link } from 'react-router-dom'
import { withResizeDetector } from 'react-resize-detector';


import './PageNav.css'

class PageNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            width: window.innerWidth
        }

        this.toggle = this.toggle.bind(this)
    }

    // Toggle Collapsible
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth })
    }

    render() {
        const { buttons } = this.props
        const btnMenu = buttons.map(btn => {
            // Some buttons uses a Router
            switch (btn.type) {
                case "link":
                    return <Link to={btn.to}>
                        <NavBtn
                            key={btn.btnKey}
                            action={btn.btnAction}
                            img={btn.img}
                            descr={btn.imgDescr}
                        />
                    </Link>
                default:
                    return <NavBtn
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    />
            }
        })

        return (
            <Navbar sticky="top" color="faded">
                {/* Sub-pages need a Link-tag to go back to parent */}
                {this.props.backIsLink === "true" ? (
                    <Link to={this.props.backTo}>
                        <NavBtn
                            isBackBtn="true"
                            img={this.props.backTo === "/" ? "Home" : "ArrowBack"}
                            descr={this.props.backDescr}
                        />
                    </Link>
                ) : (
                        <NavBtn
                            isBackBtn="true"
                            action={this.props.backAction}
                            img="ArrowPrevFolder"
                            descr={this.props.backDescr}
                            isDisabled={this.props.backIsDisabled}
                        />)
                }

                {/* Collapase is open at all times in desktop mode and toggled in phonesm, and always open if a toggle is absent */}
                <Collapse isOpen={this.props.width >= 768 || this.props.hasCollapseToggle === "false" ? "true" : this.state.isOpen}>
                    <ButtonGroup>
                        {btnMenu}
                    </ButtonGroup>
                </Collapse>

                {/* Hides Collapse-toggler in desktop, or if prop is set to false */}
                {this.props.hasCollapseToggle || this.props.width >= 768 ? '' : (
                    <NavBtn
                        class="collapse"
                        action={this.toggle}
                        img={this.state.isOpen ? "Up" : "Down"}
                        descr={this.state.isOpen ? "Åpne meny" : "Lukk meny"}
                    />
                )}
                { /* Check if searchAction is defined, or else render no search bar */
                    this.props.searchAction &&
                    <Input
                        placeholder={this.props.searchPlaceholder}
                        type="text" value={this.props.searchValue}
                        onChange={this.props.searchAction}
                    />
                }
            </Navbar>
        )
    }
}

export default withResizeDetector(PageNav)