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
                            showDescr
                            contextClass={"collapse"}
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
                        showDescr
                        contextClass={"collapse"}
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
            <div>


                <Navbar fixed="bottom" color="faded" className="page-nav">


                    <Collapse isOpen={this.state.menuIsOpen} onClick={this.toggleMenu} navbar>
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
                                    contextClass="pagenav"
                                    isBackBtn="true"
                                    img={this.props.backTo === "/" ? "Home" : "ArrowBack"}
                                    descr={this.props.backDescr}
                                />
                            </Link>
                        ) : (
                                <NavBtn
                                    contextClass="pagenav"
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
                            contextClass="pagenav"
                            action={this.toggleMenu}
                            img={this.state.menuIsOpen ? "ExpandMoreWhite" : "ExpandLessWhite"}
                            descr={this.state.menuIsOpen ? "Åpne meny" : "Lukk meny"}
                        /> : null}

                    {staticMenu}


                    {!this.props.disableSearch ? (
                        <NavBtn
                            contextClass="pagenav"
                            action={this.toggleSearch}
                            img="Search"
                            descr={this.props.searchPlaceholder}
                        />) : ("")}

                </Navbar>
            </div>
        )
    }
}

export default withResizeDetector(PageNav)