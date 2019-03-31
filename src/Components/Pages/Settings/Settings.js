import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import "./Settings.css"
import { toggleDefaultMetadataModal } from "../../../Store/Actions/modalActions";
import { setTrail, pushTrail } from "../../../Store/Actions/breadcrumbActions";
import { connect } from "react-redux";
import ChangeDefaultMetadataValuesModal from "./Modals/ChangeDefaultMetadataValuesModal/ChangeDefaultMetadataValuesModal";
import PageNav from '../../Navigation/PageNav/PageNav'
import NavBtn from '../../Shared/NavBtn/NavBtn'
import MenuBtn from '../../Shared/MenuBtn/MenuBtn'
import { setNav } from '../../../Store/Actions/navActions'
import ContentWrapper from "../../Shared/ContentWrapper/ContentWrapper";


class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            metadata_modal_open: false
        }
    }

    render() {
        const menuList = []

        return (
            <ContentWrapper>
                        <Row>
                            <Col><p className="lead">Alternativer</p></Col>
                        </Row>

                        <Row>
                            <Col xs="12"><MenuBtn action={this.props.toggleDefaultMetadataModal} text="Endre standardverdier" /></Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12"><MenuBtn action={this.props.toggleDefaultMetadataModal} text="Placeholder 1" /></Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12"><MenuBtn action={this.props.toggleDefaultMetadataModal} text="Placeholder2" /></Col>
                        </Row>
                        <hr />
                        <br />
                        <Row>
                            <Col><p className="lead">Alternativer 2</p></Col>
                        </Row>

                        <Row>
                            <Col xs="12"><MenuBtn action={this.props.toggleDefaultMetadataModal} text="Placeholder 3" /></Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="12"><MenuBtn action={this.props.toggleDefaultMetadataModal} text="Placeholder 4" /></Col>
                        </Row>
                        <hr />

                        <Row>
                            <ChangeDefaultMetadataValuesModal />
                        </Row>
            </ContentWrapper>
        )
    }

    componentDidMount() {
        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
        },
        {
            title: 'Instillinger'
        }])
        this.props.setNav({
            backIsLink:true,
            backTo:"/",
            backDescr:"Hjem",
            menuBtns:[],
            disableSearch:true
        })
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
        setTrail: (trail) => { dispatch(setTrail(trail)) },
        pushTrail: (title, path) => { dispatch(pushTrail(title, path)) },
        setNav:(options) => {dispatch(setNav(options))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

