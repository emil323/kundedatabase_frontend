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
  }


  /**
   * Move folder logic
   * @param {} new_folder 
   */

  moveFolder(new_folder) {
    const folder_id = this.props.move_folder.file.id
    API.files().folder(folder_id).move(new_folder.id).then(res => {
      console.log(res)
      this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
      this.props.toggleMoveModal()
    })
  }

  /**
   * Move file logic
   * @param {} folder 
   */

  moveFile(folder) {
    const file_id = this.props.move_folder.file.id

    API.file(file_id).move(folder.id).then(res => {
      console.log(res)
      this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
      this.props.toggleMoveModal()
    })
  }

/**
 * Handle moving file
 * @param {*} file 
 */

handleMove(file) {
  if(this.props.move_folder.file.is_directory) {
    this.moveFolder(file)
  } else {
    this.moveFile(file)
  }
  
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
                      //Check if is directory, is not in any relation conflict (don't allow to put folder inside its own folder)
                      //Check if not in current directory
                      if(file.is_directory
                         && !file.relations.includes(this.props.move_folder.file)) {
                          //Build a path based on relations array
                          const path = [...file.relations].reverse().map(r => `${r.name}`).join('/')
                          //Spew out, bind to this and file object
                          return <ListGroupItem key={file.id} onClick={this.handleMove.bind(this, file)} tag="button" action>{path}</ListGroupItem>
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
