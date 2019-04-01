import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { toggleDefaultMetadataModal } from "../../../Store/Actions/modalActions";
import { setTrail, pushTrail } from "../../../Store/Actions/breadcrumbActions";
import { connect } from "react-redux";

import { setNav } from '../../../Store/Actions/navActions'
import {authContext} from '../../../API/Auth/adalConfig'
import NavBtn from "../../Shared/NavBtn/NavBtn";
import ContentWrapper from "../../Shared/ContentWrapper/ContentWrapper";


class Logout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <ContentWrapper>
                    <p className="text-center">
                        <p>
                            Det kan være en god ide å lukke nettleservinduet etter å ha logget ut.
                        </p>
                        <Button onClick={() => authContext.logOut()}>Logg meg ut</Button>
                    </p>

            </ContentWrapper>
        )
    }

    componentDidMount() {
        this.props.setTrail([{
            title:'Hjem',
            path:'/'
        },{
            title:'Logg ut'
        }])
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
