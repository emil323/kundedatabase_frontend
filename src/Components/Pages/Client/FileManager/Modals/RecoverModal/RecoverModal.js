import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from "reactstrap";
import {connect} from "react-redux";
import {fetchFilesData} from "../../../../../../Store/Actions/filesActions";
import {toggleRecoverModal} from "../../../../../../Store/Actions/modalActions";
import {ListGroup, ListGroupItem} from 'reactstrap'

import API from "../../../../../../API/API";

class RecoverModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            is_loading: false
        }
        this.handleRecovery = this.handleRecovery.bind(this)
    }

    /**
     * Handle moving file
     * @param {*} file
     */

    handleRecovery(new_parent) {

        const {file} = this.props.recover

        //Create request object to differentiate between folder and file

        const request = (res) => {
            return file.is_directory
                ? API.folder(file.id).recover(new_parent.id).then(res)
                : API.file(file.id).recover(new_parent.id).then(res)
        }
        this.setState({is_loading: true})
        //Do request
        request(res => {
            this.setState({is_loading: false})
            this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id) //true is for is in recycle bin
            this.props.toggleRecoverModal()
        })
    }

    render() {
        return (
            <div className="container">
                <Modal
                    centered
                    isOpen={this.props.recover.modal}
                    toggle={this.props.toggleRecoverModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.props.toggleRecoverModal}>
                        Gjenopprett: {this.props.recover.file.name}
                    </ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            <p>Velg hvilken mappe du vil gjenopprette til.</p>
                            {
                                this.props.folders.map(folder => {
                                    return <ListGroupItem key={folder.id}
                                                          onClick={this.handleRecovery.bind(this, folder)} color="red"
                                                          tag="button" action>{folder.fullpath}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.is_loading && <Spinner/>}
                        <Button color="secondary" onClick={this.props.toggleRecoverModal}>Lukk</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }


}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
    const {files, root_folder, selected_folder, client_id} = state.filesReducer;
    const {recover} = state.modalReducer
    return {
        //Filter to only display files from selected folder or to handle a search value
        folders: files.filter(f => f.is_directory),
        root_folder, selected_folder, client_id, recover
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        fetchFilesData: (client_id, selected_folder) => {
            dispatch(fetchFilesData(client_id, selected_folder, {is_recyclebin: true})); //True for is recyclebin
        },
        toggleRecoverModal: (file) => {
            dispatch(toggleRecoverModal(file))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoverModal);
