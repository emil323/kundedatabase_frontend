import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData, toggleMoveModal } from "../../../../Store/Actions/filesActions";
import {FormGroup, Form, Input, ListGroup, ListGroupItem  } from 'reactstrap'

import API from "../../../../API/API";

class NewFolderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
   // this.create_folder = this.create_folder.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Send request to API to create folder
   * @param {} e 
   */




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
    return (
      <div className="container">
        <Modal
          centered
          isOpen={this.props.move_folder.modal}
          toggle={this.props.toggleMoveModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleMoveModal}>
            Flytt: {this.props.move_folder.file.name}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
                <p>Velg hvilken mappe du vil flytte til.</p>
                {
                    this.props.files.map(file => {
                        if(file.is_directory) {

                            let mappesti = file.name
                            

                            return <ListGroupItem tag="button" action>{file.name}</ListGroupItem>
                        }
                    })
                }
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleMoveModal}>Lukk</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }


}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
    console.log(state.filesReducer)
    const {
        files,
        root_folder,
        selected_folder,
        client_id,
        move_folder} = state.filesReducer;
  return {
    //Filter to only display files from selected folder or to handle a search value
    files,
    root_folder,
    selected_folder,
    client_id,
    move_folder
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder));
    },
    toggleMoveModal:(file) => {dispatch(toggleMoveModal(file))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFolderModal);
