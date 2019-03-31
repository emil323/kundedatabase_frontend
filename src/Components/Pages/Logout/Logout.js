import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { toggleDefaultMetadataModal } from "../../../Store/Actions/modalActions";
import { setTrail, pushTrail } from "../../../Store/Actions/breadcrumbActions";
import { connect } from "react-redux";

import { setNav } from '../../../Store/Actions/navActions'
import {authContext} from '../../../API/Auth/adalConfig'


class Logout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <Col sm="12" xs="12" md="12" lg={{ size: '12' }} xl={{ size: '10', offset: 1 }}>
                    <p>Logger ut...</p>
                    </Col>
                </Container >
            </div>
        )
    }

    componentDidMount() {
        authContext.logOut()
    }
}

const mapStateToProps = (state) => {
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = dispatch => {
    return {
        setTrail: (trail) => { dispatch(setTrail(trail)) },
        pushTrail: (title, path) => { dispatch(pushTrail(title, path)) },
        setNav:(options) => {dispatch(setNav(options))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)
