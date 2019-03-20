import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Nav, NavItem, Collapse, ButtonGroup, Input } from 'reactstrap'
import NavBtn from '../NavBtn/NavBtn'
import { Link } from 'react-router-dom'
import { withResizeDetector } from 'react-resize-detector';
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'

import './PageNav.css'

class PageNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuIsOpen: false,
            searchIsOpen: false,
            width: window.innerWidth
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.toggleSearch = this.toggleSearch.bind(this)
    }

    // Toggle Collapsible
    toggleMenu() {
        this.setState({
            menuIsOpen: !this.state.menuIsOpen,
            searchIsOpen: false
        })
    }

    toggleSearch() {
        this.setState({
            searchIsOpen: !this.state.searchIsOpen,
            menuIsOpen: false
        })
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth })
    }

    render() {
        const { staticMenuBtns } = this.props
        const { collapseMenuBtns } = this.props

        const collapseMenu = collapseMenuBtns.map(btn => {
            if (btn.isLink) {
                return <NavItem>
                    <Link to={btn.to}>
                        <NavBtn
                            isCollapseBtn
                            key={btn.btnKey}
                            action={btn.btnAction}
                            img={btn.img}
                            descr={btn.imgDescr}
                        />
                    </Link>
                </NavItem>
            } else {
                return <NavItem>
                    <NavBtn
                        isCollapseBtn
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    />
                </NavItem>
            }
        })

        const staticMenu = staticMenuBtns.map(btn => {
            if (btn.isLink) {
                return <Link to={btn.to}>
                    <NavBtn
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    />
                </Link>
            } else {
                return <NavBtn
                    key={btn.btnKey}
                    action={btn.btnAction}
                    img={btn.img}
                    descr={btn.imgDescr}
                />
            }
        })

        return (

            <Navbar sticky="top" color="faded" className="page-nav">
             
                    <Collapse isOpen={this.state.menuIsOpen} navbar>
                        <Nav navbar>
                            {collapseMenu}
                        </Nav>
                    </Collapse>

                    <Collapse isOpen={this.state.searchIsOpen} navbar>
                        { /* Check if searchAction is defined, or else render no search bar */
                            this.props.searchAction &&
                            <Input
                                placeholder={this.props.searchPlaceholder}
                                type="text" value={this.props.searchValue}
                                onChange={this.props.searchAction}
                            />
                        }
                    </Collapse>

                    {!this.props.backIsDisabled ? (

                        this.props.backIsLink ? (
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

                    ) : <NavBtn
                            isDisabled
                            img=""
                        />}

                    {this.props.hasCollapse ?
                        <NavBtn
                            class="collapse"
                            action={this.toggleMenu}
                            img={this.state.menuIsOpen ? "Up" : "Down"}
                            descr={this.state.menuIsOpen ? "Åpne meny" : "Lukk meny"}
                        /> : null}

                    {staticMenu}

                    <NavBtn
                        class="collapse"
                        action={this.toggleSearch}
                        img="Search"
                        descr={this.props.searchPlaceholder}
                    />
            </Navbar>
        )
    }
}

export default withResizeDetector(PageNav)