import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { fetchFilesData, toggleRenameModal } from "../../../../Store/Actions/filesActions";
import {Form, FormGroup, Input} from 'reactstrap'

import API from "../../../../API/API";

class RenameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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

    const request = (res) => {
      return file.is_directory 
          ? API.folder(file.id).rename(value).then(res)  
          : API.file(file.id).rename(value).then(res)
    }

    //Do request
    request(res => {
        this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
        this.props.toggleRenameModal()
    })
  }



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
          isOpen={this.props.rename.modal}
          toggle={this.props.toggleRenameModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleRenameModal}>
            Endre navn: {this.props.rename.file.name}
          </ModalHeader>
          <ModalBody>
          <Form id="rename_form" onSubmit={this.create_folder}>
               <FormGroup>
                   <Input  type="text" name="rename" id="rename" value={this.state.value} onChange={this.handleChange} ></Input>
               </FormGroup>
           </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleRename}>Endre navn</Button>
            <Button color="secondary" onClick={this.props.toggleRenameModal}>Lukk</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
     this.setState({value:nextProps.rename.file.name})
  }

}

// Calls on a clientsReducer that bring props to the component


const mapStateToProps = state => {
   
  const {files,root_folder,selected_folder,client_id,rename} = state.filesReducer;

  return {
    //Filter to only display files from selected folder or to handle a search value
    files, root_folder, selected_folder,client_id, rename
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder));
    },
    toggleRenameModal:(file) => {dispatch(toggleRenameModal(file))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenameModal);
