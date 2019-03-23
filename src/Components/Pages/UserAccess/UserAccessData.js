import React from 'react'
import { Input, Label } from 'reactstrap';



class UserAccessData extends React.Component {

    render() {
       
        return (
            <tbody>                      
                <tr>
                    <td>{this.props.user.email}</td>
                    <td>{this.props.user.first_name} {this.props.user.last_name}</td>
                </tr>
            </tbody>
        )
    }
}


export default UserAccessData