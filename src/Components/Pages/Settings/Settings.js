import React from 'react';
import { Container, Button } from 'reactstrap';
import "./Settings.css"
import {toggleDefaultMetadataModal} from "../../../Store/Actions/modalActions";
import {connect} from "react-redux";
import ChangeDefaultMetadataValuesModal from "./Modals/ChangeDefaultMetadataValuesModal/ChangeDefaultMetadataValuesModal";


class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            metadata_modal_open: false
        }
    }

    render() {
        return (<div>
            <h2>Instillinger</h2>
            <hr/>
            <h3>Standard verdier for strukturert data</h3>
            <hr/>
            <Button onClick={this.props.toggleDefaultMetadataModal} color='primary'>Endre</Button>
            <ChangeDefaultMetadataValuesModal/>
        </div>)
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
)(Settings);