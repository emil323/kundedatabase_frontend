import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactQuill from 'react-quill';
import { connect } from 'react-redux'
import { toggleEditorModal } from '../../../../../../Store/Actions/modalActions';
import './EditorModal.css'

class EditorModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backdrop: true,
            text: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    printTest() {
        alert()
    }

    render() {
        return (
            <div className="container">
                <Modal shouldCloseOnOverlayClick={false}
                    centered
                    backdrop={this.state.backdrop}
                    isOpen={this.props.editor_modal}
                    toggle={this.props.toggleEditorModal}
                >
                    <ModalHeader toggle={this.toggle}>Tekstbehandler</ModalHeader>
                    <ModalBody>
                        <ReactQuill
                            value={this.state.text}
                            onChange={this.handleChange}
                            theme={'snow'}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.insertText}>OK</Button>
                        <Button color="secondary" onClick={this.props.toggleEditorModal}>Lukk</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {editor_modal } = state.modalReducer
    return {
        editor_modal
    }
}

const mapDispatchToProps = dispatch => {
    return { toggleEditorModal: () => { dispatch(toggleEditorModal()) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorModal)