import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData } from "../../../../Store/Actions/filesActions";
import {FormGroup, Form, Input, Label } from 'reactstrap'

import "./NewFolderModal.css";
import API from "../../../../API/API";

class NewFolderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: ''
    }
    this.toggle = this.toggle.bind(this);
    this.create_folder = this.create_folder.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Turn modal on or off
   */

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      value: ''
    }));
  }

  /**
   * Send request to API to create folder
   * @param {} e 
   */

  create_folder(e) {
    e.preventDefault()

    const post_data = {
      new_folder_name: this.state.value
    }

    API.files().folder(this.props.selected_folder.id).create_folder(post_data)
      .then(res => {
        console.log(res)
        this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
        this.toggle()
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
    return (
      <div className="container">
        <Button color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          centered
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Legg til ny mappe i: {this.props.selected_folder.name}
          </ModalHeader>
          <ModalBody>
           <Form id="new_folder_form" onSubmit={this.create_folder}>
               <FormGroup>
                   <Input type="text" name="new_folder_name" id="new_folder_name" value={this.state.value} onChange={this.handleChange} placeholder="Navn på ny mappe"></Input>
               </FormGroup>
           </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="new_folder_form" color="primary">Opprett</Button>  
            <Button color="secondary" onClick={this.toggle}>Lukk</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
    const {
        files,
        root_folder,
        selected_folder,
        client_id} = state.filesReducer;
  return {
    //Filter to only display files from selected folder or to handle a search value
    files: files.filter(file => {
      return file.parent_id === selected_folder.id;
      //TODO:Handle search value
    }),
    root_folder,
    selected_folder,
    client_id
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFolderModal);
