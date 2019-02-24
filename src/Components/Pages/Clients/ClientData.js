import React from 'react'
import { Link } from "react-router-dom"
import API from '../../../API/API';

class ClientsData extends React.Component {
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

    

    updateFavourites = () => {
        API.favourites().create({
            client_id: this.props.client.id
        })
        .then(res => {})
        .catch(err => { 
          console.log(err)
        })
    }

    render() {
       
        return (
            <tbody>
                <tr>
                    <Link  to={"./client/" + this.props.client.id + '/files'}><td>{this.props.client.name}</td></Link>
                    <th>{this.props.client.id}</th>

                    {/*
                    Usikker på beste løsning her. Checkbox velger ikke riktig rad?
                    onClick={this.updateFavourites} plassering?
                     */}
                    <td> 
                        <label for="id-of-input" class="custom-checkbox">
                            <input  type="checkbox" id="id-of-input"/>
                            <i class="glyphicon glyphicon-heart-empty"></i>
                            <i onClick={this.updateFavourites} class="glyphicon glyphicon-heart"></i>
                        </label>
                    </td>
                </tr>
            </tbody>
        )
    }
}


export default(ClientsData)