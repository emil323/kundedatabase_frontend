import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Dropzone from "react-dropzone";
import classNames from "classnames";
import API from "../../../../API/API";
import { connect } from "react-redux";
import { fetchFilesData } from "../../../../Store/Actions/filesActions";
import "./UploadModal.css";

import downloadIcon from "../../../../Assets/Icons/download.png";

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      files_to_upload: []
    };

    this.toggle = this.toggle.bind(this);
  }

  /**
   * Toggle Modal component visible/invisible
   */

  toggle() {
    this.setState(prevState => ({
      ...this.state,
      modal: !prevState.modal,
      files_to_upload: []
    }));
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
        prevState,
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

    //Post formData to API
    API.files()
      .folder(folder_id)
      .upload(formData)
      .then(response => {
        console.log(response);
        this.toggle();
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
    const hasFiles = this.state.files_to_upload.length === 0;

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
            Last opp til: {this.props.selected_folder.name}
          </ModalHeader>
          <ModalBody>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={classNames("dropzone", {
                      "dropzone--isActive": isDragActive
                    })}
                  >
                    <img className="modalImage" src={downloadIcon} />
                    <input {...getInputProps()} />
                    {
                      <p className="modalP">
                        {isDragActive
                          ? "...og slipp her."
                          : " Dra filer hit..."}
                      </p>
                    }

                    <Button color="primary" className="modalBtn">
                      Eller velg filer{" "}
                    </Button>
                    <div className="modalDiv">
                      <p className="modalChosenFiles">
                        {hasFiles ? "" : "Valgte filer:"}
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
            {
              <p className="modalResetFiles">
                {hasFiles ? (
                  ""
                ) : (
                  <Button onClick={this.reset.bind(this)}>Nullstill</Button>
                )}
              </p>
            }
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className={hasFiles ? "disabled" : ""}
              onClick={this.upload.bind(this)}
            >
              Start opplastning
            </Button>
            <Button color="secondary" onClick={this.toggle}>
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
  return {
    //Filter to only display files from selected folder or to handle a search value
    files: files.filter(file => {
      return file.parent_id === selected_folder.id;
      //TODO:Handle search value
    }),
    root_folder,
    selected_folder,
    client_id,
    search
  };
};

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
)(UploadModal);
