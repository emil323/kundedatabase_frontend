import React from 'react'
import {Component} from 'react'
import "./Client.css"
import Files from "../Files/Files"
import { connect } from "react-redux";
import {fetchFilesData} from '../../../Store/Actions/filesActions'
import api from '../../../API/API';



class Client extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        console.log(this.props.match.params.client_id)
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