import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import ClientsTable from './ClientsTable'
import "./Clients.css"

class Clients extends Component {
    state = {
        clients:[]
    }


    componentDidMount() {
        api.clients().list().then(res => {
            console.log(res)
            this.setState(res.data)
        }).catch(function(error) {
            console.log(error)
        })
    }

    deleteClient = (id) => {
        const clients = this.state.clients.filter(client => {
            return client.id !== id
        })
        this.setState({
            clients: clients
        })
    }

    render() {
        return (
            <ClientsTable clients={this.state.clients} deleteClient={this.deleteClient}/>
        )
    }
}

export default Clients