import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData } from "../../../../../../Store/Actions/filesActions";
import { toggleDeleteModal } from "../../../../../../Store/Actions/modalActions";

import API from "../../../../../../API/API";

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }



/**
 * Handle moving file
 * @param {*} file 
 */

handleDelete() {

    const {file} = this.props.delete

    //Create request object to differentiate between folder and file 
    const request = (res) => {
      return file.is_directory 
          ? API.folder(file.id).delete().then(res)  
          : API.file(file.id).delete().then(res)
    }

    //Do request
    request(res => {
        this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
        this.props.toggleDeleteModal()
    })
}

  render() {
    return (
      <div className="container">
        <Modal
          centered
          isOpen={this.props.delete.modal}
          toggle={this.props.toggleDeleteModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleDeleteModal}>
            Slett: {this.props.delete.file.name}
          </ModalHeader>
          <ModalBody>
            <p>Er du helt sikker på at du vil slette <b>{this.props.delete.file.name}</b>?</p>
            <p>Elementet vil bli flyttet til papirkurven, og slettet permanent etter 30 dager.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleDelete}>Slett</Button> 
            <Button color="secondary" onClick={this.props.toggleDeleteModal}>Avbryt</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }


}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
    const {root_folder,selected_folder,client_id} = state.filesReducer;
  return {
    //Filter to only display files from selected folder or to handle a search value
    root_folder, selected_folder,client_id, delete: state.modalReducer.delete
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder));
    },
    toggleDeleteModal:(file) => {dispatch(toggleDeleteModal(file))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModal);
