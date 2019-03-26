import React, { Component } from 'react'
import { Container, Row, Col, Navbar, Nav, NavItem, Collapse, ButtonGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, Label } from 'reactstrap'
import NavBtn from '../NavBtn/NavBtn'
import { Link } from 'react-router-dom'
import { withResizeDetector } from 'react-resize-detector';
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateSearch } from '../../../Store/Actions/navActions'

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

        const isMobile = this.props.width < 768
        const isTablet = this.props.width < 1200
        const isDesktop = this.props.width > 1200

        const pageMenu = menuBtns.map(btn => {
            if (btn.isLink) {
                return <NavItem><Link to={btn.to}>
                    <NavBtn
                        showDescr={this.props.hasCollapse && isMobile ? true : false}
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
                        showDescr={this.props.hasCollapse && isMobile ? true : false}
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
        
        const pagenav_style = isDesktop ?  'page-nav-desktop' : 'page-nav-mobile'

        return (
            <Navbar sticky={isDesktop ? "top" : null} fixed={isTablet ? "bottom" : null} color="faded" className={pagenav_style}>
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
                            
                            <Form inline>
                                <Input
                                    placeholder={this.props.searchPlaceholder}
                                    type="text" value={this.props.search}
                                    onChange={this.props.updateSearch}
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
                            type="text" value={this.props.search}
                            onChange={this.props.updateSearch}
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
        updateSearch:(key) => {dispatch(updateSearch(key))}
    }
}


export default withRouter(withResizeDetector(connect(mapStateToProps, mapDispatchToProps)(PageNav)))