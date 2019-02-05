import React from 'react'
import {Component} from 'react'
import "./Client.css"
import Files from "../Files/Files"
import ClientHeader from '../../Jumbotron/ClientHeader';

class Client extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container">
                <ClientHeader clientName={this.props.match.params.client_id}/>
                <Files />
            </div>
        )
    }
}

export default Client