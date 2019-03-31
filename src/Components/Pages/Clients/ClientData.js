import React from 'react'
import { Link } from "react-router-dom"
import API from '../../../API/API';
import NavBtn from '../../Shared/NavBtn/NavBtn'


class ClientsData extends React.Component {
    constructor(props) {
        super(props);
        this.updateFavourites = this.updateFavourites.bind(this) 
    }

    updateFavourites = () => {

        const {id, is_favourite} = this.props.client

        //Create a request object
        const request = (res) => {
            return is_favourite 
                ? API.favourites().delete(id).then(res) 
                : API.favourites().create(id).then(res)}
      
        //Do request
        request(res => {
            //This is by all means not critical, so just refresh list and see what happens :)
            this.props.fetchClientsData()
        }).catch(err =>
             console.log(err)) 
    }
    

    render() {
          
        return (
            <tbody>
                <tr>
                    <Link  to={"./client/" + this.props.client.id + '/files'}><td>{this.props.client.name}</td></Link>
                    <td className='text-right'>  
                        <NavBtn action={this.updateFavourites} img={this.props.client.is_favourite ? "StarFilled" : "StarBorder"} descr="Angi som favoritt" />
                    </td>
                </tr>
            </tbody>
        )
    }
}


export default(ClientsData)