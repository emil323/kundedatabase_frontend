import React from 'react'


 const ClientsTable = ({clients, deleteClient}) => {


        return(
            <tbody>
                <tr>
                    <th>{clients.id}</th>
                    <td>{clients.firmanavn}</td>
                    <td>{clients.kontaktperson}</td>
                    <td>{clients.sistendret}</td>
                    <td><button key={clients.id} onClick={() => {deleteClient(clients.id)}}>DEL</button></td>
                </tr>
            </tbody>
        )
}


export default ClientsTable