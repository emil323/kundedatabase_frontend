import React from 'react'
import {Component} from 'react'
import "./Client.css"
import Files from "../Files/Files"



class Client extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container">
                <h1>{this.props.match.params.client_id}</h1>
                <Files />
            </div>
        )
    }
}



export default Client