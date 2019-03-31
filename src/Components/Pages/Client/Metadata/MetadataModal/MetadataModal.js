import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,Input, Table} from "reactstrap";


import {toggleMetadataModal} from "../../../../../Store/Actions/modalActions";
import {connect} from "react-redux";
import api from "../../../../../API/API";
import NavBtn from "../../../../Shared/NavBtn/NavBtn";
import {requestMetadata} from "../../../../../Store/Actions/clientActions";

class MetadataModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading: true,
            default_values: [],
            metadata:[]
        }
        this.loadDefaultValues = this.loadDefaultValues.bind(this)
    }

    /**
     * Load default values if necessary
     */

    loadDefaultValues() {
        console.log('load')
        api.metadata().default_values().then(res => {
            const default_values = res.data.map(d => {
                return {title:d.value, content:''}
            })
            console.log(default_values)
            this.setState({...this.state, is_loading:false, metadata: default_values})
        })
    }

    updateValues = () => {
        api.client(this.props.client_id).update_metadata(this.state.metadata).then(res => {
            if(res.error) {
                console.log(res.error)
            } else {
                this.props.requestMetadata(this.props.client_id)
                this.props.toggleMetadataModal()
            }
        })
    }

    /**
     * Handle binding of content
     * @param i
     */

    handleContentChange = i => evt => {
        const new_metadata = this.state.metadata.map((d,si) => {
            if(i !== si) return d
            return {...d, content:evt.target.value}
        })
        this.setState({...this.state, metadata:new_metadata})
    }

    /**
     * Handle binding of title
     * @param i
     */

    handleTitleChange = i => evt => {
        const new_metadata = this.state.metadata.map((d,si) => {
            if(i !== si) return d
            return {...d, title:evt.target.value}
        })
        this.setState({...this.state, metadata:new_metadata})
    }

    /**
     * Remove field
     * @returns {XML}
     */

    handleRemove = i => () => {
        console.log('ok')
        this.setState({
            ...this.state,
            metadata: this.state.metadata.filter((d,si) => i !== si)
        })
    }

    /**
     * Add new client
     *
     * */

    handleAdd = () =>  {
        this.setState({
            ...this.state,
            metadata: this.state.metadata.concat(({title:'',content:''}))
        })
    }

    render() {

        const table = this.state.metadata.map((d,i) => {
            return (
                <tbody key={i}>
                    <td valign='middle'><Input value={d.title} onChange={this.handleTitleChange(i)} /></td>
                    <td valign='middle'><Input value={d.content} onChange={this.handleContentChange(i)} /></td>
                    <td valign='middle'><NavBtn img='Trash' action={this.handleRemove(i)} /></td>
                </tbody>)
        })

        return (
            <div className="container">
                <Modal
                    centered
                    isOpen={this.props.metadata_modal}
                    toggle={this.props.toggleMetadataModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleMetadataModal}>
                        Endre strukturert data
                    </ModalHeader>
                    <ModalBody>
                        {this.props.is_loading
                            ? <Spinner color='secondary'/>
                            : <div>
                                 <Table>{table}</Table>
                                {/*Button for adding new data input*/}
                                <NavBtn img='Add' action={this.handleAdd}>Legg til nytt felt</NavBtn>
                            </div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className={this.props.is_loading || this.state.metadata.length === 0 ? 'disabled' :''} onClick={this.updateValues}>Endre</Button>
                        <Button color="secondary" onClick={this.props.toggleMetadataModal}>Avbryt</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    /**
     * Check if metadata is empty, we do this check to figure out if we need to load default values or not
     */
    componentWillReceiveProps(newProps) {
        if(newProps.metadata_modal) {
            newProps.has_metadata ? this.setState({
                ...this.state,
                is_loading: false,
                metadata: newProps.metadata
            }) : this.loadDefaultValues()
        }
    }
}

const mapStateToProps = (state) => {
    const {metadata_modal} = state.modalReducer;
    const {metadata, client_id} = state.clientReducer

    const has_metadata = metadata.length > 0
    //Iniate load default values if need
    return {metadata_modal, has_metadata, metadata, client_id}
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleMetadataModal:() => {dispatch(toggleMetadataModal())},
        requestMetadata:(client_id) => {dispatch(requestMetadata(client_id))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MetadataModal);
