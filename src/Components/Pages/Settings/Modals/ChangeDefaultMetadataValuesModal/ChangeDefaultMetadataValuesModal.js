import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,Input, Table} from "reactstrap";


import {toggleDefaultMetadataModal} from "../../../../../Store/Actions/modalActions";
import {connect} from "react-redux";
import api from "../../../../../API/API";
import NavBtn from "../../../../Shared/NavBtn/NavBtn";

class ChangeDefaultMetadataValuesModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_loading: true,
            default_values: [],
        }
        this.loadDefaultValues = this.loadDefaultValues.bind(this)
    }

    /**
     * Load default values if necessary
     */

    loadDefaultValues() {
        this.setState({...this.state, is_loading:true})
        api.metadata().default_values().then(res => {
            const default_values = res.data.map(d => {
                return {title:d.value}
            })
            console.log(default_values)
            this.setState({...this.state, is_loading:false, default_values})
        })
    }

    updateValues = () => {
        api.metadata().update_default_values(this.state.default_values).then(res => {
            console.log(res)
            if(!res.error) {
                this.props.toggleDefaultMetadataModal()
            }
        })
    }

    /**
     * Handle binding of content
     * @param i
     */

    handleChange = i => evt => {
        const new_default_values = this.state.default_values.map((d,si) => {
            if(i !== si) return d
            return {title:evt.target.value}
        })
        this.setState({...this.state, default_values:new_default_values})
    }



    /**
     * Remove field
     * @returns {XML}
     */

    handleRemove = i => () => {
        this.setState({
            ...this.state,
            default_values: this.state.default_values.filter((d,si) => i !== si)
        })
    }

    /**
     * Add new client
     *
     * */

    handleAdd = () =>  {
        this.setState({
            ...this.state,
            default_values: this.state.default_values.concat(({title:''}))
        })
    }

    render() {

        const table = this.state.default_values.map((d,i) => {
            return (
                <tbody key={i}>
                <td valign='middle'><Input value={d.title} onChange={this.handleChange(i)} /></td>
                <td valign='middle'><NavBtn img='Trash' action={this.handleRemove(i)} /></td>
                </tbody>)
        })

        return (
            <div className="container">
                <Modal
                    centered
                    isOpen={this.props.default_metadata_modal}
                    toggle={this.props.toggleDefaultMetadataModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleDefaultMetadataModal}>
                        Endre standardverdier for strukturert kundedata
                    </ModalHeader>
                    <ModalBody>
                        <p>Disse vil vises som standardverdier ved endring av strukturert kundedata.</p>
                        {this.state.is_loading
                            ? <Spinner color='secondary'/>
                            : <div>
                                <Table>{table}</Table>
                                {/*Button for adding new data input*/}
                                <NavBtn img='Add' action={this.handleAdd}>Legg til ny verdi</NavBtn>
                            </div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className={this.props.is_loading || this.state.default_values.length === 0 ? 'disabled' :''} onClick={this.updateValues}>Endre</Button>
                        <Button color="secondary" onClick={this.props.toggleDefaultMetadataModal}>Avbryt</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    /**
     * Check if metadata is empty, we do this check to figure out if we need to load default values or not
     */
    componentWillReceiveProps(newProps) {
        if(newProps.default_metadata_modal) {
            this.loadDefaultValues()
        }
    }
}

const mapStateToProps = (state) => {
    const {default_metadata_modal} = state.modalReducer;

    //Iniate load default values if need
    return {default_metadata_modal}
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleDefaultMetadataModal:() => {dispatch(toggleDefaultMetadataModal())},
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeDefaultMetadataValuesModal);
