import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import "./Settings.css"
import { toggleDefaultMetadataModal } from "../../../Store/Actions/modalActions";
import { connect } from "react-redux";
import ChangeDefaultMetadataValuesModal from "./Modals/ChangeDefaultMetadataValuesModal/ChangeDefaultMetadataValuesModal";
import PageNav from '../../Shared/PageNav/PageNav'
import NavBtn from '../../Shared/NavBtn/NavBtn'


class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            metadata_modal_open: false
        }
    }

    render() {

        const staticMenuList = []
        const collapseMenuList = []

        return (
            <Container fluid>
                <PageNav
                    backIsLink
                    backTo={'/'}

                    disableSearch
                    staticMenuBtns={staticMenuList}
                    collapseMenuBtns={collapseMenuList}
                />
                <Row>
                    <Col>
                        <h2>Instillinger</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h2>Alternativer</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs="10"><p>Standard verdier for strukturert data</p></Col>
                    <Col xs="2"><NavBtn action={this.props.toggleDefaultMetadataModal} img="ArrowForward" descr="Endre standardverdier" /></Col>
                </Row>

                <Row>
                    <Col>

                        <hr />
                    </Col>
                </Row>

                <Row>
                    <ChangeDefaultMetadataValuesModal />

                </Row>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    const { default_metadata_modal } = state.modalReducer;

    //Iniate load default values if need
    return { default_metadata_modal }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        toggleDefaultMetadataModal: () => { dispatch(toggleDefaultMetadataModal()) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);