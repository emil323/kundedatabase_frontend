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
                <h1>{this.state.name}</h1>
                <Files client_id={this.props.match.params.client_id}/>
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