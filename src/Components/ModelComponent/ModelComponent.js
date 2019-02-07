import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFile from '../Pages/UploadFile/UploadFile';
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import API from '../../API/API';
import { connect } from "react-redux";
import {fetchFilesData} from '../../Store/Actions/filesActions'

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {

    this.setState(prevState => ({
      ...this.state,
      modal: !prevState.modal
    }));

  }

  onDrop(files) {

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file)
      console.log(this.props)
       API.files().folder(this.props.selected_folder).upload(formData)
        .then((response) => {
          this.props.fetchFilesData(this.props.client_id, this.props.selected_folder)
        })
        .catch((err) => {
          console.log(err)
        })
        
    })
  }

  

  render() {
    return (
      <div className="container">
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.selected_folder}</ModalHeader>
          <ModalBody>
          <Dropzone onDrop={this.onDrop.bind(this)}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>sssssssssssssssssssssssssssssssssssssssssss</p>
                }
              </div>
            )
          }}
      </Dropzone>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
  const {files, root_folder,selected_folder, client_id, search} = state.filesReducer
  return {
      //Filter to only display files from selected folder or to handle a search value
      files:files.filter((file) => { 
          return file.parent_id === selected_folder
          //TODO:Handle search value
      }),
      root_folder,
      selected_folder,
      client_id,
      search
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
  return {
      fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder))},
}

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)