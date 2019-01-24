import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import ClientsTable from './ClientsTable'
import AddClient from "./AddClient"
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

    addClient = (client) => {
        let id;
        if(this.state.clients.length > 0){
            id = this.state.clients[this.state.clients.length - 1].id + 1;
        }else{
            id = 0;
        }

        client.id = id;
        let clients = [...this.state.clients, client];
        this.setState({
          clients: clients
        })
      }

    render() {
   
        return (
            <div className="todo-app container">
                <ClientsTable clients={this.state.clients} deleteClient={this.deleteClient}/>
                <AddClient addClient={this.addClient}/>
            </div>
        )
    }
}

export default Clients