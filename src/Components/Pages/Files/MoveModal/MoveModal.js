import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData, toggleMoveModal } from "../../../../Store/Actions/filesActions";
import {FormGroup, Form, Input, Label } from 'reactstrap'

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
      console.log(this)
    return (
      <div className="container">
        <Modal
          centered
          isOpen={this.props.move_modal}
          toggle={this.props.toggleMoveModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Flytt: {this.props.selected_folder.name}
          </ModalHeader>
          <ModalBody>
           <Form id="move_folder_form">
               <FormGroup>
                   <Input type="text" name="move_location" id="move_location" value={this.state.value} onChange={this.handleChange} placeholder="Navn på ny mappe"></Input>
               </FormGroup>
           </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="move_folder_form" color="primary">Flytt</Button>  
            <Button color="secondary" onClick={this.props.toggleMoveModal}>Lukk</Button>
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
        client_id,
        move_modal} = state.filesReducer;
  return {
    //Filter to only display files from selected folder or to handle a search value
    files: files.filter(file => {
      return file.parent_id === selected_folder.id;
      //TODO:Handle search value
    }),
    root_folder,
    selected_folder,
    client_id,
    move_modal
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder));
    },
    toggleMoveModal:() => {dispatch(toggleMoveModal())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFolderModal);
