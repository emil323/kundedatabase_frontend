import React, {Component } from 'react'
import { Collapse, Jumbotron, Navbar, NavbarToggler, Spinner, Table , Alert,Button} from 'reactstrap'
import {connect} from "react-redux";
import NavBtn from '../../../Shared/NavBtn/NavBtn'
import api from "../../../../API/API";

import './Metadata.css'
import {toggleMetadataModal} from "../../../../Store/Actions/modalActions";
import MetadataModal from "./MetadataModal/MetadataModal";
import {requestMetadata} from "../../../../Store/Actions/clientActions";

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
        if(!this.props.metadata_loaded) this.props.requestMetadata(this.props.client_id)
    }

    render() {

        const metadata = this.props.metadata.map(e => {
            return <tbody>
                <tr>
                    <td>{e.title}</td>
                    <td>{e.content}</td>
                </tr>
            </tbody>
        })

        const has_data = this.props.metadata.length > 0

        return(<div className="metadata">
            <Jumbotron className='display-5' >
                <h1>{this.props.client_name}</h1>
                <Collapse isOpen={this.state.isOpen}>
                    {this.props.metadata_loaded
                        ? has_data
                            ? <Table>{metadata}</Table>
                            : <Alert color='secondary'>Ingen data lagt til enda</Alert>
                        : <Spinner color='secondary'/>}

                </Collapse>
                <p>
                    <NavBtn img={this.state.isOpen ? 'Up' : 'Down'} action={this.toggleCollapse}>
                        {this.state.isOpen ? 'Skjul' : 'Vis skjult innhold'}
                    </NavBtn>
                    {this.state.isOpen && this.props.metadata_loaded ? <NavBtn action={this.props.toggleMetadataModal} img='Edit'>Endre</NavBtn> : ''}
                </p>

            </Jumbotron>
            <MetadataModal />
            </div>
        )
    }


}

const mapStateToProps = state => {
    const {metadata_modal} = state.modalReducer;
    const {metadata, metadata_loaded} = state.clientReducer
    return {metadata_modal, metadata, metadata_loaded}
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleMetadataModal:() => {dispatch(toggleMetadataModal())},
        requestMetadata:(client_id) => {dispatch(requestMetadata(client_id))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Metadata);