import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Spinner} from "reactstrap";
import {connect} from "react-redux";
import {fetchFilesData} from "../../../../../../Store/Actions/filesActions";
import {toggleNewFolderModal} from "../../../../../../Store/Actions/modalActions";
import {FormGroup, Form, Input} from 'reactstrap'

import './NewFolderModal.css'
import API from "../../../../../../API/API";

class NewFolderModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            is_loading:false
        }
        this.create_folder = this.create_folder.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Send request to API to create folder
     * @param {} e
     */

    create_folder(e) {
        e.preventDefault()


        const new_folder_name = this.state.value

        this.setState({...this.state, is_loading:true})
        API.folder(this.props.selected_folder.id).create_folder(new_folder_name)
            .then(res => {
                this.setState({...this.state, is_loading:false})
                console.log(res)
                this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
                this.props.toggleNewFolderModal()
            })
            .catch(err => {
                console.log(err)
            })
    }


    /**
     * Handle change of foldername
     * @param {} event
     */

    handleChange(event) {
        this.setState({
            ...this.state,
            value: event.target.value
        })
    }

    render() {

        if (this.state.value === undefined) return null //shit fix

        const is_unique = this.props.files.filter(file => {
            return this.state.value.toLowerCase() === file.name.toLowerCase()
                && file.parent_id === this.props.selected_folder.id
        }).length === 0

        const valid_filename = this.state.value.match(/^\s*[a-z-._\d,\s]+\s*$/i)
        const is_empty = this.state.value.length === 0

        return (
            <div className="container">
                {/*<Button className="dropUpBtn" color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        */}
                <Modal
                    centered
                    isOpen={this.props.new_folder_modal}
                    toggle={this.props.toggleNewFolderModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                        Legg til ny mappe i: {this.props.selected_folder.name}
                    </ModalHeader>
                    <ModalBody>
                        {
                            !valid_filename && !is_empty ?
                                <Alert color='danger'>Navnet inneholder ugyldige tegn</Alert> : ''
                        }
                        {
                            !is_unique ? <Alert color='danger'>Navnet finnes allerede i denne mappen.</Alert> : ''
                        }
                        <Form id="new_folder_form" onSubmit={this.create_folder}>
                            <FormGroup>
                                <Input type="text" name="new_folder_name" id="new_folder_name" value={this.state.value}
                                       onChange={this.handleChange} placeholder="Navn på ny mappe"></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.is_loading && <Spinner/>}
                        <Button form="new_folder_form" color="primary"
                                className={!is_unique || !valid_filename ? 'disabled' : ''}>Opprett</Button>
                        <Button color="secondary" onClick={this.props.toggleNewFolderModal}>Lukk</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
    const {
        files,
        root_folder,
        selected_folder,
        client_id
    } = state.filesReducer;

    const {new_folder_modal} = state.modalReducer

    return {
        //Filter to only display files from selected folder or to handle a search value
        files,
        root_folder,
        selected_folder,
        client_id,
        new_folder_modal
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        fetchFilesData: (client_id, selected_folder) => {
            dispatch(fetchFilesData(client_id, selected_folder));
        },
        toggleNewFolderModal: () => {
            dispatch(toggleNewFolderModal())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewFolderModal);
