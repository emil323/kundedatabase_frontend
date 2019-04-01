import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Spinner} from "reactstrap";
import {connect} from "react-redux";
import {fetchFilesData} from "../../../../../../Store/Actions/filesActions"
import {toggleRenameModal} from "../../../../../../Store/Actions/modalActions";
import {Form, FormGroup, Input} from 'reactstrap'


import API from "../../../../../../API/API";

class RenameModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            is_loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRename = this.handleRename.bind(this)
    }

    /**
     * Handle renaming of files and folder
     */

    handleRename() {

        const {file} = this.props.rename
        const {value} = this.state

        //Create request object to differentiate between folder and file
        this.setState({...this.state, is_loading: true})
        const request = (res) => {
            return file.is_directory
                ? API.folder(file.id).rename(value).then(res)
                : API.file(file.id).rename(value).then(res)
        }

        //Do request
        request(res => {
            this.setState({...this.state, is_loading: false})
            this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id, {selected_file: this.props.selected_file !== undefined ? this.props.selected_file.id : null})
            this.props.toggleRenameModal()
        })
    }


    handleChange(event) {
        this.setState({
            ...this.state,
            value: event.target.value
        })
    }

    handleFocus = e => {
        e.target.select()
    }

    render() {

        if (this.state.value === undefined) return null

        //Check if value if unique in selected directory
        const is_unique = this.props.files.filter(file => {
            return this.state.value.toLowerCase() === file.name.toLowerCase()
                && file.id !== this.props.rename.file.id
                && file.parent_id === this.props.selected_folder.id
        }).length === 0

        const valid_filename = this.state.value.match(/^\s*[a-z-._\d,\s]+\s*$/i)
        const is_empty = this.state.value.length === 0

        return (
            <div className="container">
                <Modal
                    centered
                    isOpen={this.props.rename.modal}
                    toggle={this.props.toggleRenameModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.props.toggleRenameModal}>
                        Endre navn: {this.props.rename.file.name}
                    </ModalHeader>
                    <ModalBody>
                        {
                            !valid_filename && !is_empty ?
                                <Alert color='danger'>Navnet inneholder ugyldige tegn</Alert> : ''
                        }
                        {
                            !is_unique ? <Alert color='danger'>Navnet finnes allerede i denne mappen.</Alert> : ''
                        }
                        <Form id="rename_form" onSubmit={this.create_folder}>
                            <FormGroup>
                                <Input type="text" onFocus={this.handleFocus} name="rename" id="rename" value={this.state.value}
                                       onChange={this.handleChange}></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.is_loading && <Spinner/>}
                        <Button color="primary" onClick={this.handleRename}
                                className={!is_unique || !valid_filename ? 'disabled' : ''}>Endre navn</Button>
                        <Button color="secondary" onClick={this.props.toggleRenameModal}>Lukk</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.rename.file.name})
    }

}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {

    const {files, root_folder, selected_folder, selected_file, client_id} = state.filesReducer;
    const {rename} = state.modalReducer

    return {
        //Filter to only display files from selected folder or to handle a search value
        files, root_folder, selected_folder, selected_file, client_id, rename
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        fetchFilesData: (client_id, selected_folder, options) => {
            dispatch(fetchFilesData(client_id, selected_folder, options));
        },
        toggleRenameModal: (file) => {
            dispatch(toggleRenameModal(file))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenameModal);
