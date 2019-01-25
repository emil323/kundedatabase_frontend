import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import ClientsTable from './ClientsTable'
import AddClient from "./AddClient"
import "./Clients.css"
import { Table } from 'reactstrap';

class Clients extends Component {
    constructor(props){
        super(props);
        this.state = {
            clients:[],
            search: ""
        }
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

    updateSearch(e){
        this.setState({
            search: e.target.value.substr(0,20)
        })
    }

    

    render() {
        let filteredClients = this.state.clients.filter(client => {
            return client.firmanavn.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
            <Table className="table table-hover">
            <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Firmanavn</th>
                            <th>Kontaktperson</th>
                            <th>Sist endret</th>
                            <th>Slett</th>
                        </tr>
                    </thead>
                {
                    filteredClients.map(client => {
                        return  <ClientsTable clients={client} deleteClient={this.deleteClient} key={client.id}/>
                    })
                }
                </Table>
                <AddClient addClient={this.addClient}/>
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
            </div>
        )
    }
}

export default Clients