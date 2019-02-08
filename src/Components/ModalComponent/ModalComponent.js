import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFile from '../Pages/UploadFile/UploadFile';
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import API from '../../API/API';
import { connect } from "react-redux";
import {fetchFilesData} from '../../Store/Actions/filesActions'
import './ModalComponent.css'

import downloadIcon from "../../Assets/Icons/download.png"

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      files_to_upload: []
    };

    this.toggle = this.toggle.bind(this)
  }

  toggle() {

    this.setState(prevState => ({
      ...this.state,
      modal: !prevState.modal,
      files_to_upload : []
    }));

  }



  onDrop(files) {

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file)

      this.setState((prevState) => ({
       prevState , 
        files_to_upload: [
          ...prevState.files_to_upload,
          formData
        ]
      }))

      /* API.files().folder(this.props.selected_folder).upload(formData)
        .then((response) => {
          this.props.fetchFilesData(this.props.client_id, this.props.selected_folder.id)
        })
        .catch((err) => {
          console.log(err)
        })
        */
    })
  }

 upload() {
   const formData =new FormData()
   this.state.files_to_upload.forEach(file => {
     formData.append(file.get('file'))
   })
   API.files().folder(this.props.selected_folder).upload(formData)
        .then((response) => {
          this.props.fetchFilesData(this.props.client_id, this.props.selected_folder)
        })
        .catch((err) => {
          console.log(err)
        })
 }

  render() {
    
    return (
      <div className="container">
      
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.selected_folder}</ModalHeader>
          <ModalBody>
          <Dropzone onDrop={this.onDrop.bind(this)}>
            {({getRootProps, getInputProps, isDragActive}) => {
              return (
                <div
                  {...getRootProps()}
                  className={classNames('dropzone',{'dropzone--isActive': isDragActive})}
                >
                  <img className="modalImage" src={downloadIcon}></img>
                  <input  {...getInputProps()} />
                  {
                   <p className="modalP">{isDragActive ? "Slipp her..." : " Dra filer hit..."}</p>
                  }
            
                  <Button  color="primary" className="modalBtn">Eller velg filer </Button>
                  <div className="modalDiv">{this.state.files_to_upload.map((file) => {return (<p>{file.get('file').name}</p>)})}</div>
                </div>
              )
            }}  
          </Dropzone>
   
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Last opp</Button>{' '}
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
          return file.parent_id === selected_folder.id
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
      fetchFilesData: (client_id, selected_folder) =>{ dispatch(fetchFilesData(client_id, selected_folder.id))},
}

}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)