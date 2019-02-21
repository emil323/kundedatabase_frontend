import React from 'react'
import {Component} from 'react'
import { connect } from "react-redux";
import "./Client.css"
import Files from "../Files/Files"
import {fetchClientData} from '../../../Store/Actions/clientActions'
import {setTrail, pushTrail} from '../../../Store/Actions/breadcrumbActions'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom'



import ClientHeader from '../../Jumbotron/ClientHeader';
import RecycleBin from '../RecycleBin/RecycleBin';

class Client extends Component {

    render() {

        return (
            <div className="container">

                <ClientHeader clientName={this.props.client_name}/>
                <Switch>
                    <Route path={`/client/:client_id/files/:selected_folder?`} component={Files}/>
                    <Route path={`/client/:client_id/recyclebin/:selected_folder?`} component={RecycleBin}/>
                </Switch>
                
            </div>
        )
    }

    componentDidMount() {
        const {client_id} = this.props.match.params
        this.props.fetchClientData(client_id)
    }

    componentWillReceiveProps(nextProps) {

        /**
         * Props received, client_name has been updated (probably)
         */

        this.props.setTrail([{
                title: nextProps.client_name,
                path: '/client/' + nextProps.client_id + '/files'
        }])
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
        fetchClientData: (client_id) => { dispatch(fetchClientData(client_id)) },
        setTrail: (trail) => {dispatch(setTrail(trail))},
        pushTrail: (title, path) => {dispatch(setTrail(title, path))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)