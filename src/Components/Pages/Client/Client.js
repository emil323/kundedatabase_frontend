import React from 'react'
import { Component } from 'react'
import { Container} from 'reactstrap';
import { connect } from "react-redux";
import "./Client.css"
import FileManager from "./FileManager/FileManager"
import { fetchClientData } from '../../../Store/Actions/clientActions'
import { Route, Switch } from 'react-router-dom'
import Metadata from "./Metadata/Metadata";


class Client extends Component {

    render() {
        return (
            <Container fluid>
            <Metadata client_name={this.props.client_name} client_id={this.props.client_id}/>
            <Switch>
                <Route path={`/client/:client_id/files/:selected_folder?`} render={(props) => <FileManager {...props} is_recyclebin={false} />} />
                <Route path={`/client/:client_id/recyclebin/:selected_folder?`} render={(props) => <FileManager {...props} is_recyclebin={true} />} />
            </Switch>
            </Container>
        )
    }

    componentDidMount() {
        const { client_id } = this.props.match.params
        this.props.fetchClientData(client_id)
    }
}

// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const { client_name, client_id } = state.clientReducer
    return { client_name, client_id }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClientData: (client_id) => { dispatch(fetchClientData(client_id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)