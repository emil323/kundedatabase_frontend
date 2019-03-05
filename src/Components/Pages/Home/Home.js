import React from "react"
import Welcome from '../../Jumbotron/Welcome';
import Favorites from '../Favourites/Favourites';

import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap'

class Home extends React.Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Welcome />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <Favorites />
                    </Col>
                </Row>
            </Container>

        )
    }

    componentDidMount() {
        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
        }])
    }
}

// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients,
        search: state.clientsReducer.search,
        is_loading: state.clientsReducer.is_loading
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        setTrail: (trail) => { dispatch(setTrail(trail)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
