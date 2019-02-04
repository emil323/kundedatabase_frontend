import React from 'react'
import {Component} from 'react'
import ClientsTable from './ClientsTable'
import AddClient from "./AddClient"
import "./Clients.css"
import { Table } from 'reactstrap';

// Import connect, which lets us export data to the reducer
import { connect } from "react-redux";
import { deleteClient, addClient, fetchClientsData, updateSearch} from '../../../Store/Actions/clientActions'

class Clients extends Component {


    render() {
        console.log(this.props.clients)
        let filteredClients = this.props.clients.filter(client => {
            return client.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
        })
        return (
            <div className="container">
            <Table className="table table-hover">
            <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Firmanavn</th>
                            <th>Slett</th>
                        </tr>
                    </thead>
                {
                    filteredClients.map(client => {
                        return  <ClientsTable clients={client} deleteClient={this.props.deleteClient} key={client.id}/>
                    })
                }
                </Table>
                <AddClient addClient={this.props.addClient}/>
                <label>Søk etter kunde:</label>
                <input type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this)}/>
            </div>
        )
    }

    //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
        this.props.fetchClientsData()
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients,
        search: state.clientsReducer.search
    }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
    return {
        deleteClient: (id) => { dispatch(deleteClient(id))},
        addClient: (client) => { dispatch(addClient(client))},
        fetchClientsData: () =>{ dispatch(fetchClientsData())},
        updateSearch:(search_key) => {dispatch(updateSearch(search_key))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)