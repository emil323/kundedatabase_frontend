import React from 'react'
import {Component} from 'react'
import api from '../../../API/API'
import ClientsTable from './ClientsTable'
import AddClient from "./AddClient"
import "./Clients.css"
import { Table } from 'reactstrap';

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteClient, addClient } from '../../../Store/Actions/clientActions'

class Clients extends Component {
    state = {
        search: ""
    }
    

    deleteClient = (id) => {
        this.props.deleteClient(id)
    }

    addClient = (client) => {
        let id;
        if(this.props.clients.length > 0){
            id = this.props.clients[this.props.clients.length - 1].id + 1;
        }else{
            id = 0;
        }

        client.id = id;
  
        // Usikker her...
        this.props.addClient(client)
    }


    updateSearch(e){
        this.setState({
            search: e.target.value.substr(0,20)
        })
    }


    render() {
        let filteredClients = this.props.clients.filter(client => {
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
                <label>Søk etter kunde:</label>
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
            </div>
        )
    }
}

// Calls on a clientsReducer that is set to the state of the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteClient: (id) => { dispatch(deleteClient(id))},
        addClient: (client) => { dispatch(addClient(client))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)