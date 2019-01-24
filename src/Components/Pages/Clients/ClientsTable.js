import React from 'react'
import { Table } from 'reactstrap';

 const ClientsTable = ({clients, deleteClient}) => {

        const filterClients = clients.filter((client) => {
            return client.firmanavn.indexOf(client.firmanavn) !== -1
        })

        const clientList = clients.length ? (
            filterClients.map(client => {
                return (
                        <tbody>
                            <tr>
                                <th>{client.id}</th>
                                <td>{client.firmanavn}</td>
                                <td>{client.kontaktperson}</td>
                                <td>{client.sistendret}</td>
                                <td><button key={client.id} onClick={() => {deleteClient(client.id)}}>DEL</button></td>
                            </tr>
                        </tbody>
                )
            })
        ) : (
            <div className="text-center" align="center">You have no clients left</div>
        )

        return(
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
            {clientList}
            <input></input>
            </Table>
        )
}

export default ClientsTable