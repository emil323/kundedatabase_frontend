import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Nav, NavItem, Collapse, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Label } from 'reactstrap'
import NavBtn from '../NavBtn/NavBtn'
import { Link } from 'react-router-dom'
import { withResizeDetector } from 'react-resize-detector';
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

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

        const { menuBtns } = this.props
        console.log('navbtns', this.props)

        const pageMenu = menuBtns.map(btn => {
            if (btn.isLink) {
                return <NavItem><Link to={btn.to}>
                    <NavBtn
                        showDescr={this.props.hasCollapse && this.props.width < 768 ? true : false}
                        hasTooltip
                        contextId={btn.contextId}
                        contextClass={"collapse"}
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    />
                </Link></NavItem>
            } else {
                return <NavItem>
                    <NavBtn
                        showDescr={this.props.hasCollapse && this.props.width < 768 ? true : false}
                        hasTooltip
                        contextId={btn.contextId}
                        contextClass={"collapse"}
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    /> </NavItem>
            }
        })
        
        return (
            <Navbar sticky={this.props.width > 1200 ? "top" : null} fixed={this.props.width < 1200 ? "bottom" : null} color="faded" className="page-nav">
                <Mobile>
                    <Collapse isOpen={this.state.menuIsOpen} onClick={this.toggleMenu} navbar>
                        <Nav className="ml-auto" navbar>
                            {pageMenu}
                        </Nav>
                    </Collapse>
                </Mobile>

                <Mobile>
                    <Collapse isOpen={this.state.searchIsOpen} navbar>
                        { /* Check if searchAction is defined, or else render no search bar */
                            this.props.searchAction &&
                            <Form inline>
                                <Input
                                    placeholder={this.props.searchPlaceholder}
                                    type="text" value={this.props.searchValue}
                                    onChange={this.props.searchAction}
                                />   </Form>
                        }
                    </Collapse>
                </Mobile>

                {!this.props.backIsDisabled ? (
                    this.props.backIsLink ? (
                        <NavItem>
                            <Link to={this.props.backTo}>
                                <NavBtn
                                    contextId="back"
                                    contextClass="pagenav"
                                    isBackBtn="true"
                                    img={this.props.backTo === "/" ? "Home" : "ArrowBack"}
                                    descr={this.props.backDescr}
                                />
                            </Link>
                        </NavItem>
                    ) : (
                            <NavItem>
                                <NavBtn
                                    contextId="back"
                                    contextClass="pagenav"
                                    isBackBtn="true"
                                    action={this.props.backAction}
                                    img="ArrowPrevFolder"
                                    descr={this.props.backDescr}
                                    isDisabled={this.props.backIsDisabled}
                                />
                            </NavItem>)
                ) : <NavBtn
                        isDisabled
                        img=""
                    />}

                <Mobile>
                    {this.props.hasCollapse === true ?
                        <NavItem>
                            <NavBtn
                                contextId="collapse-toggle"
                                contextClass="pagenav"
                                action={this.toggleMenu}
                                img={this.state.menuIsOpen ? "ExpandMoreWhite" : "ExpandLessWhite"}
                                descr={!this.state.menuIsOpen ? "Åpne meny" : "Lukk meny"}
                            /></NavItem> : <div>{pageMenu}</div>}
                </Mobile>
                <Desktop>
                    {pageMenu}
                </Desktop>

                <Mobile>
                    {!this.props.disableSearch ? (
                        <NavItem>
                            <NavBtn
                                contextId="search"
                                contextClass="pagenav"
                                action={this.toggleSearch}
                                img="Search"
                                descr={this.props.searchPlaceholder}
                            /></NavItem>) : ("")}
                </Mobile>

                <Desktop>
                    <Form inline>
                        <Input
                            placeholder={this.props.searchPlaceholder}
                            type="text" value={this.props.searchValue}
                            onChange={this.props.searchAction}
                        /></Form>
                </Desktop>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return state.navReducer
}

const mapDispatchToProps = (dispatch) => {
    return {
        //Not in use atm
    }
}


export default withRouter(withResizeDetector(connect(mapStateToProps, mapDispatchToProps)(PageNav)))