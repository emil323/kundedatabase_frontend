import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Alert} from "reactstrap";


import {toggleMetadataModal} from "../../../../../Store/Actions/modalActions";
import {connect} from "react-redux";
import api from "../../../../../API/API";

class MetadataModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading:true,
            default_values:[]
        }
        this.loadDefaultValues = this.loadDefaultValues.bind(this)
    }

    loadDefaultValues() {
        api.metadata().default_values().then(res => {
            const default_values = res.data.map(d => {
                return {title:d, content:''}
            })
            console.log(default_values)
            this.setState({...this.state, is_loading:false, default_values})
        })
    }


    render() {
        const data = this.props.has_metadata ? this.props.metadata : this.state.default_values
        const table = data ? data.map((d,i) => {
            return (
                <tbody key={}>
                <td></td>
                <td></td>
                </tbody>)
        }) : <Alert color='danger'>Klarte ikke å laste verdier.</Alert>

        return (
            <div className="container">
                <Modal
                    centered
                    isOpen={this.props.metadata_modal}
                    toggle={this.props.toggleMetadataModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleMetadataModal}>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.is_loading
                            ? <Spinner color='secondary'/>
                            : table}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleDelete}>Endre</Button>
                        <Button color="secondary" onClick={this.props.toggleMetadataModal}>Avbryt</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    /**
     * Check if metadata is empty, we do this check to figure out if we need to load default values or not
     */
    componentWillReceiveProps(oldProps, newProps) {
        if(oldProps !== newProps) {
            this.props.has_metadata === true ? this.setState({
                ...this.state,
                is_loading: false
            }) : this.loadDefaultValues()
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const {metadata_modal} = state.modalReducer;
    const has_metadata = ownProps.metadata.length > 0
    //Iniate load default values if need
    return {metadata_modal, has_metadata}
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleMetadataModal:() => {dispatch(toggleMetadataModal())}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MetadataModal);
