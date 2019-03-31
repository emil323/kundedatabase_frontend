import React from 'react'
import {Component} from 'react'
import {Container, Col, Row} from 'reactstrap';
import {connect} from "react-redux";
import "./Client.css"
import FileManager from "./FileManager/FileManager"
import {clearClient, fetchClientData} from '../../../Store/Actions/clientActions'
import {Route, Switch} from 'react-router-dom'
import Metadata from "./Metadata/Metadata";
import {clearFiles} from "../../../Store/Actions/filesActions";
import TrailUpdater from './FileManager/TrailUpdater'
import ContentWrapper from "../../Shared/ContentWrapper/ContentWrapper";

class Client extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ContentWrapper>

                {this.props.client_loading ? '' :
                    <div><Metadata client_name={this.props.client_name}
                                   client_id={this.props.client_id}/><TrailUpdater/></div>}
                <Switch>
                    <Route path={`/client/:client_id/files/:selected_folder?`}
                           render={(props) => <FileManager is_recyclebin={false}/>}/>
                    <Route path={`/client/:client_id/recyclebin/:selected_folder?`}
                           render={(props) => <FileManager is_recyclebin={true}/>}/>
                </Switch>

            </ContentWrapper>
        )
    }

    componentDidMount() {
        //const { client_id } = this.props.match.params
        // this.props.fetchClientData(client_id)
    }

    componentWillUnmount() {
        //this.props.clearClient()
        //this.props.clearFiles()
    }
}

// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const {client_name, client_id, is_loading} = state.clientReducer
    return {client_name, client_id, client_loading: is_loading}
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClientData: (client_id) => {
            dispatch(fetchClientData(client_id))
        },
        clearClient: () => {
            dispatch(clearClient())
        },
        clearFiles: () => {
            dispatch(clearFiles())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client)