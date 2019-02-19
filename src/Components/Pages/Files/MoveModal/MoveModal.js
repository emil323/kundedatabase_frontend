import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData} from "../../../../Store/Actions/filesActions";
import { toggleMoveModal} from "../../../../Store/Actions/modalActions";
import {ListGroup, ListGroupItem  } from 'reactstrap'

import API from "../../../../API/API";

class NewFolderModal extends React.Component {
  constructor(props) {
    super(props);
  }



/**
 * Handle moving file
 * @param {*} file 
 */

handleMove(new_parent) {

    const {file} = this.props.move

    //Create request object to differentiate between folder and file 

    const request = (res) => {
      return file.is_directory 
          ? API.folder(file.id).move(new_parent.id).then(res)  
          : API.file(file.id).move(new_parent.id).then(res)
    }

    //Do request
    request(res => {
        this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
        this.props.toggleMoveModal()
    })
}

  render() {
    return (
      <div className="container">
        <Modal
          centered
          isOpen={this.props.move.modal}
          toggle={this.props.toggleMoveModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleMoveModal}>
            Flytt: {this.props.move.file.name}
          </ModalHeader>
          <ModalBody>
            <ListGroup>
                <p>Velg hvilken mappe du vil flytte til.</p>
                {
                    this.props.folders.map(folder => {
                      //Check if is directory, is not in any relation conflict (don't allow to put folder inside its own folder)
                      //Check if not in current directory
                      if(!folder.relations.includes(this.props.move.file)
                         && folder.id !== this.props.selected_folder.id) {
                          //Build a path based on relations array
                          const path = [...folder.relations].reverse().map(r => `${r.name}`).join('/')
          
                          //Spew out, bind to this and file object
                          return <ListGroupItem key={folder.id} onClick={this.handleMove.bind(this, folder)} color="red" tag="button" action>{path}</ListGroupItem>
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
    const { files,root_folder,selected_folder,client_id} = state.filesReducer;
    const {move} = state.modalReducer
  return {
    //Filter to only display files from selected folder or to handle a search value
    folders: files.filter(f =>  f.is_directory),
    root_folder, selected_folder,client_id, move
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
