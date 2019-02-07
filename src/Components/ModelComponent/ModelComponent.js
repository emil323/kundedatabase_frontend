import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UploadFile from '../Pages/UploadFile/UploadFile';
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import API from '../../API/API';

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
      modal: !prevState.modal
    }));
  }

  onDrop(files) {
    var formData = new FormData();
    formData.append("file", files[0]);
    console.log(formData)

   /*  API.client(this.props.client_id).folder(this.props.folder_id).upload(formData)
      .then((response) => {
        console.log(response)
      })
       */

  }

  

  render() {
    return (
      <div className="container">
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Dropzone onDrop={this.onDrop}>
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

export default ModalComponent;