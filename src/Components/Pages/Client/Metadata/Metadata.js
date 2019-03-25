import React, { Component } from 'react'
import { Collapse, Jumbotron, Navbar, NavbarBrand, Nav, NavItem, Spinner, Table, Alert } from 'reactstrap'
import { connect } from "react-redux";
import NavBtn from '../../../Shared/NavBtn/NavBtn'


import './Metadata.css'
import { toggleMetadataModal } from "../../../../Store/Actions/modalActions";
import MetadataModal from "./MetadataModal/MetadataModal";
import { requestMetadata } from "../../../../Store/Actions/clientActions";
import { Mobile, Desktop } from '../../../Helpers/Responsive/Responsive'

import './Metadata.css'

class Metadata extends Component {
    constructor(props) {
        super(props)
        this.toggleCollapse = this.toggleCollapse.bind(this)

        this.state = {
            isOpen: false,
        }
    }

    toggleCollapse() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
        //Initiate loadMetadata if data isn't loaded yet, we make sure to only load when needed because of logging purpose
        if (!this.props.metadata_loaded) this.props.requestMetadata(this.props.client_id)
    }

    render() {

        const metadata = this.props.metadata.map(e => {
            return <tbody>
                <tr>
                    <Mobile>
                        <td className='word_break'>
                            <strong>{e.title}</strong>
                            <p>{e.content}</p>
                        </td>
                    </Mobile>
                    <Desktop>
                        <td className='word_break'>{e.title}</td><br />
                        <td className='word_break'>{e.content}</td>
                    </Desktop>
                </tr>
            </tbody>
        })



        const has_data = this.props.metadata.length > 0

        return (<div className="metadata">
         
                <Navbar color="dark" dark>
                        <NavbarBrand className="mr-auto">
                            {this.props.client_name}</NavbarBrand>
                        <Nav navbar>
                            <NavItem>
                                <NavBtn img={this.state.isOpen ? 'ExpandLessWhite' : 'ExpandMoreWhite'} action={this.toggleCollapse} />
                            </NavItem>
                        </Nav>              
                </Navbar>


                <Collapse isOpen={this.state.isOpen}>
                    {this.props.metadata_loaded
                        ? has_data
                            ? <Table>{metadata}</Table>
                            : <Alert color='secondary'>Ingen data lagt til enda</Alert>
                        : <Spinner color='secondary' />}
                </Collapse>
                {this.state.isOpen && this.props.metadata_loaded ? <NavBtn hasTooltip showDescr contextId="edit-metadata" descr="Endre metadata" className="btn-edit-metadata" action={this.props.toggleMetadataModal} img='Edit' /> : ''}


          
            <MetadataModal />
        </div>
        )
    }


}

const mapStateToProps = state => {
    const { metadata_modal } = state.modalReducer;
    const { metadata, metadata_loaded } = state.clientReducer
    return { metadata_modal, metadata, metadata_loaded }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleMetadataModal: () => { dispatch(toggleMetadataModal()) },
        requestMetadata: (client_id) => { dispatch(requestMetadata(client_id)) }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Metadata);