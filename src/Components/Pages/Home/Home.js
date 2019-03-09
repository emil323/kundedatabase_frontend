import React from "react"
import Welcome from '../../Shared/Jumbotron/Welcome';
import Favorites from './Favourites/Favourites';

import { setTrail } from '../../../Store/Actions/breadcrumbActions'
import { connect } from "react-redux";
import { Container, Row, Col } from 'reactstrap'
import api from '../../../API/API'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath: ''
        }
    }
    
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
                <img src={this.state.filePath}/>
            </Container>

        )
    }

    componentDidMount() {
        this.props.setTrail([{
            title: 'Hjem',
            path: '/'
        }])

        api.file('fef23556-7aac-43ee-84cd-a4f9e1c08c82').download().then(res => {
            
            const url = URL.createObjectURL(new Blob([res.data]));
            
            const link = document.createElement('a');
            console.log(link)
            link.href = url;

            //link.setAttribute('download', 'lol.pdf');
            document.body.appendChild(link);
            this.setState({
                filePath: url
            })
            
           // link.click()
        })
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
