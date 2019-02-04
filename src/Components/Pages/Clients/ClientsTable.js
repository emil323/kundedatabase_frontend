import React from 'react'
import DropdownBtn from '../../DropdownBtn/DropdownBtn';


class ClientsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnOptions: [
                { tekst: 'Behandle', isHeader: 1, key: 1 },
                { tekst: 'Vis', isHeader: 0, key: 2 },
                { tekst: 'Slett', isHeader: 0, key: 3 },
                { tekst: 'Placeholder', isHeader: 1, key: 4 },
                { tekst: 'Placeholder', isHeader: 0, key: 5, },
            ]
        }

    }

    render() {
       
        return (
            <tbody>
                <tr>
                    <th>{this.props.clients.id}</th>
                    <td>{this.props.clients.firmanavn}</td>
                    <td>{this.props.clients.kontaktperson}</td>
                    <td>{this.props.clients.sistendret}</td>
                    {/* <td><button key={this.props.clients.id} onClick={() => { this.props.deleteClient(this.props.clients.id) }}>DEL</button></td> */}
                    <DropdownBtn options={this.state.btnOptions} />
                </tr>
            </tbody>
        )
    }
}


export default ClientsTable