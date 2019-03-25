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
        const { menuBtns } = this.props

        /*   const collapseMenu = collapseMenuBtns.map(btn => {
              if (btn.isLink) {
                  return <NavItem>
                      <Link to={btn.to}>
                          <NavBtn
                              hasTooltip
                              contextId={btn.contextId}
                              contextClass={this.state.width < 768 ? "collapse" : "navbar"}
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
                          hasTooltip
                          contextId={btn.contextId}
                          contextClass={this.state.width < 768 ? "collapse" : "navbar"}
                          key={btn.btnKey}
                          action={btn.btnAction}
                          img={btn.img}
                          descr={btn.imgDescr}
                      />
                  </NavItem>
              }
          }) */

        const pageMenu = menuBtns.map(btn => {
            if (btn.isLink) {
                return <Link to={btn.to}>
                    <NavBtn
                        showDescr={this.props.hasCollapse ? true : false}
                        hasTooltip
                        contextId={btn.contextId}
                        contextClass={"collapse"}
                        key={btn.btnKey}
                        action={btn.btnAction}
                        img={btn.img}
                        descr={btn.imgDescr}
                    />
                </Link>
            } else {
                return <NavBtn
                    showDescr={this.props.hasCollapse ? true : false}
                    hasTooltip
                    contextId={btn.contextId}
                    contextClass={"collapse"}
                    key={btn.btnKey}
                    action={btn.btnAction}
                    img={btn.img}
                    descr={btn.imgDescr}
                />
            }
        })

        return (
                <Navbar sticky={this.props.width > 1200 ? "top" : null } fixed={this.props.width < 1200 ? "bottom" : null} color="faded" className="page-nav">

                    <Mobile>
                        <Collapse isOpen={this.state.menuIsOpen} onClick={this.toggleMenu} navbar>
                            <Nav navbar>
                                {pageMenu}
                            </Nav>
                        </Collapse>
                    </Mobile>

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
                                    hasTooltip
                                    contextId="back"
                                    contextClass="pagenav"
                                    isBackBtn="true"
                                    img={this.props.backTo === "/" ? "Home" : "ArrowBack"}
                                    descr={this.props.backDescr}
                                />
                            </Link>
                        ) : (
                                <NavBtn
                                    hasTooltip
                                    contextId="back"
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

                    <Mobile>
                        {this.props.hasCollapse === true ?
                            <NavBtn
                                hasTooltip
                                contextId="collapse-toggle"
                                contextClass="pagenav"
                                action={this.toggleMenu}
                                img={this.state.menuIsOpen ? "ExpandMoreWhite" : "ExpandLessWhite"}
                                descr={!this.state.menuIsOpen ? "Åpne meny" : "Lukk meny"}
                            /> : <div>{pageMenu}</div>}
                    </Mobile>
                    <Desktop>
                        {pageMenu}
                    </Desktop>

                    {!this.props.disableSearch ? (
                        <NavBtn
                            hasTooltip
                            contextId="search"
                            contextClass="pagenav"
                            action={this.toggleSearch}
                            img="Search"
                            descr={this.props.searchPlaceholder}
                        />) : ("")}

                </Navbar>
        )
    }
}

export default withResizeDetector(PageNav)