import React from 'react'
import { Link } from "react-router-dom"

 const ClientsTable = ({clients, deleteClient}) => {


        return(
            <tbody>
                <tr>
                    <td>{clients.id}</td>
                    <Link to={"clients/" + clients.firmanavn}><td>{clients.firmanavn}</td></Link>
                    <td>{clients.kontaktperson}</td>
                    <td>{clients.sistendret}</td>
                    <td><button key={clients.id} onClick={() => {deleteClient(clients.id)}}>DEL</button></td>
                </tr>
          
            </tbody>
        )
}


export default ClientsTable