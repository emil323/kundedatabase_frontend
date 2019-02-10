import React from 'react'
import {Component} from 'react'
import "./Client.css"
import Files from "../Files/Files"

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
                <Files  client_id={this.props.match.params.client_id} 
                        folder={this.props.match.params.selected_folder} />
                
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