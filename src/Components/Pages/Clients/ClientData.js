import React from 'react'
import { Link } from "react-router-dom"
import DropdownBtn from '../../DropdownBtn/DropdownBtn';


class ClientsTable extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            btnOptions: [
                { tekst: 'Behandle', isHeader: 1, key: 1 },
                { tekst: 'Vis', isHeader: 0, key: 2,function: () => {}},
                { tekst: 'Slett', isHeader: 0, key: 3, function: () => {return props.deleteClient(props.client.id)} },
                { tekst: 'Placeholder', isHeader: 1, key: 4 },
                { tekst: 'Placeholder', isHeader: 0, key: 5, },
            ]
        }

    }

    render() {
       
        return (
            <tbody>
                <tr>
                    <Link to={"./client/" + this.props.client.id}><td>{this.props.client.name}</td></Link>
                    <th>{this.props.client.id}</th>
                    {/* <td><button key={this.props.clients.id} onClick={() => { this.props.deleteClient(this.props.clients.id) }}>DEL</button></td> */}
                    <td><DropdownBtn options={this.state.btnOptions} /></td>
                </tr>
          
            </tbody>
        )
    }
}


export default ClientsTable