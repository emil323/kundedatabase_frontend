import React from 'react'
import {Component} from 'react'
import {Button} from 'reactstrap'
import "./Client.css"
import Files from "../Files/Files"
import {
    BrowserRouter as Router,
    Route,
    Link,
  } from 'react-router-dom'

import api from '../../../API/API';


import ClientHeader from '../../Jumbotron/ClientHeader';

class Client extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div className="container">

                <ClientHeader clientName={this.state.name}/>
                
                <Route path={`/client/:client_id/:selected_folder?`} component={Files}/>
                
                
            </div>
        )
    }

    componentDidMount() {
        const {client_id} = this.props.match.params
        api.client(client_id).get()
            .then((response) => {
                this.setState({name: response.data.name})
            })
    }
}

export default Client