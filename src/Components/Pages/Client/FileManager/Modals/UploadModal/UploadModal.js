import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import API from "../../../../../../API/API";
import { connect } from "react-redux";
import { fetchFilesData } from "../../../../../../Store/Actions/filesActions";
import { toggleUploadModal } from "../../../../../../Store/Actions/modalActions";
import {Mobile, Desktop} from '../../../../../Helpers/Responsive/Responsive'
import "./UploadModal.css";

import Upload from "../../../../../../Assets/Icons/upload-black.png";

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: true,
      is_uploading: false, 
      files_to_upload: []
    }
  }


  /**
   *
   * Handles files added to upload queue
   *
   * @param {*} files
   */

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();
      formData.append("file", file);

      this.setState(prevState => ({
        ...prevState,
        files_to_upload: [...prevState.files_to_upload, formData]
      }));
    });
  }

  /**
   * Handles uploading files, is fired when clicking at upload button
   */

  upload() {
    const formData = new FormData();

    //Load all single formdatas, to one uniform formData.
    this.state.files_to_upload.forEach(file => {
      formData.append("files", file.get("file"));
    });

    const folder_id = this.props.selected_folder.id;
    
    //Set uploading spinner to true, to make upload spinner visible
    this.setState({
        ...this.state,
        is_uploading: true 
      })

    //Post formData to API
    API.folder(folder_id)
      .upload(formData)
      .then(response => {
        console.log(response);
        this.props.toggleUploadModal()
        this.reset()
        //Update state is uploading to false, to hide upload spinner
        this.setState({
          ...this.state,
          is_uploading: false 
        })
        this.props.fetchFilesData(this.props.client_id, folder_id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Reset fileuploads
   */

  reset() {
    this.setState(prevState => ({
      ...prevState,
      files_to_upload: []
    }));
  }

  /**
   * Renders Modal
   */

  render() {
    const hasFiles = this.state.files_to_upload.length > 0;

    return (
      <div className='modal_override'>
        {/*<Button className="dropUpBtn" color="primary" onClick={this.toggle}>
          {this.props.buttonLabel}
          </Button> */}
        <Modal
          centered
          backdrop={this.state.backdrop}
          isOpen={this.props.upload_modal}
          toggle={this.props.toggleUploadModal}
          
        >
          <ModalHeader toggle={this.toggle}>
            Last opp til: {this.props.selected_folder.fullpath}
          </ModalHeader>
          <ModalBody>
           { this.state.is_uploading ?
            <p className='modalP'>
            <p><Spinner/></p>
            Laster opp...
            </p> 
            :<Dropzone onDrop={this.onDrop.bind(this)}>
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={classNames("dropzone", {
                      "dropzone--isActive": isDragActive
                    })}
                  >
                    <img className="modalImage" src={Upload} alt=""/>
                    <input {...getInputProps()} />
                    <Desktop>
                      {
                        <p className="modalP">
                          {isDragActive
                            ? "...og slipp her."
                            : " Dra filer hit..."}
                        </p>
                      }
                    </Desktop>
                    <p className="modalDiv">
                    <Desktop>
                      <Button color="info" >
                        Eller velg filer...
                      </Button>
                    </Desktop>
                    <Mobile>
                      <p className='modalP'>
                        Last opp filer fra mobil
                      </p>
                      <Button color="info" >
                        Velg filer
                      </Button>
                    </Mobile>
                    </p>
                    <div className="modalDiv">
                      <p className="modalChosenFiles">
                        {hasFiles ? "Valgte filer:" : ""}
                      </p>
                      {this.state.files_to_upload.map(file => {
                        const name = file.get("file").name;
                        return <p key={name}>{name}</p>;
                      })}
                    </div>
                  </div>
                );
              }}
            </Dropzone>
            }
            {
              <p className="modalResetFiles">
                {hasFiles && !this.state.is_uploading ? 
                <Button color="link" onClick={this.reset.bind(this)}>Nullstill</Button> : ''}
              </p>
            }
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className={hasFiles && !this.state.is_uploading ? '' : 'disabled'}
              onClick={this.upload.bind(this)}
            >
              Start opplastning
            </Button> 
           <Button color="secondary"
              className={this.state.is_uploading ? "disabled" : ''}
              onClick={this.props.toggleUploadModal}>
              Lukk
            </Button>
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
    client_id,
    search
  } = state.filesReducer;

  const {upload_modal} = state.modalReducer

  return {
    //Filter to only display files from selected folder or to handle a search value
    files: files.filter(file => {
      return file.parent_id === selected_folder.id;
      //TODO:Handle search value
    }),
    root_folder,
    selected_folder,
    client_id,
    search,
    upload_modal
  };
};

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
  return {
    fetchFilesData: (client_id, selected_folder) => {
      dispatch(fetchFilesData(client_id, selected_folder, {is_recyclebin:false}));
    },
    toggleUploadModal: () => {
      dispatch(toggleUploadModal())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadModal);
