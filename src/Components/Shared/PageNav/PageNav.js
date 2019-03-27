import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Collapse, Input, Form } from 'reactstrap'
import NavBtn from '../NavBtn/NavBtn'
import { Link } from 'react-router-dom'
import { withResizeDetector } from 'react-resize-detector';
import { Mobile, Desktop } from '../../Helpers/Responsive/Responsive'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateSearch } from '../../../Store/Actions/navActions'
import Breadcrumbs from '../../Navigation/Breadcrumbs/Breadcrumbs'
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
        const isTablet = this.props.width < 1200 && this.props.width > 768
        const isDesktop = this.props.width > 1200

        const buttons_white = isDesktop ? false : true

        const pageMenu = menuBtns.map(btn => {
            if (btn.isLink) {
                return <NavItem><Link to={btn.to}>
                    <NavBtn
                        white={buttons_white}
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
                        white={buttons_white}
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

        const pagenav_style = isDesktop ? 'page-nav-desktop' : 'page-nav-mobile'


        return (
            <div>
                {
                    /** Show breadscrumbs here if not desktop */
                    !isDesktop && <Breadcrumbs />
                }
                <Navbar sticky={isDesktop ? "top" : null} fixed={isTablet || isMobile ? "bottom" : null} color="faded" className={pagenav_style}>
                    {
                        isDesktop && <Breadcrumbs className="breadcrumb-desktop" />
                    }

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

                    <Mobile>
                        {!this.props.backIsDisabled ? (
                            this.props.backIsLink ? (
                                <NavItem>
                                    <Link to={this.props.backTo}>
                                        <NavBtn
                                            white={buttons_white}
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
                                            white={buttons_white}
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
                    </Mobile>

                    <Mobile>
                        {this.props.hasCollapse === true ?
                            <NavItem>
                                <NavBtn
                                    white={buttons_white}
                                    contextId="collapse-toggle"
                                    contextClass="pagenav"
                                    action={this.toggleMenu}
                                    img={this.state.menuIsOpen ? "ExpandMore" : "ExpandLess"}
                                    descr={!this.state.menuIsOpen ? "Åpne meny" : "Lukk meny"}
                                /></NavItem> : <div>{pageMenu}</div>}
                    </Mobile>

                    {isTablet ?
                        pageMenu : null
                    }

                    {isDesktop ?
                        <Nav className="ml-auto">
                            {pageMenu}
                        </Nav> : null}

                    {!this.props.disableSearch ? (
                        <div>

                        <Mobile>
                            <NavItem>
                                <NavBtn
                                    white={buttons_white}
                                    contextId="search"
                                    contextClass="pagenav"
                                    action={this.toggleSearch}
                                    img="Search"
                                    descr={this.props.searchPlaceholder}
                                /></NavItem>
                        </Mobile>

                        <Desktop>
                            <Form inline>
                                <Input
                                    placeholder={this.props.searchPlaceholder}
                                    type="text" value={this.props.search}
                                    onChange={this.props.updateSearch}
                                /></Form>
                        </Desktop>
                        </div>) : <NavBtn isDisabled/>}
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.navReducer
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearch: (key) => { dispatch(updateSearch(key)) }
    }
}


export default withRouter(withResizeDetector(connect(mapStateToProps, mapDispatchToProps)(PageNav)))