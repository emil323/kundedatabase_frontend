import React from 'react'
import { Input, Label } from 'reactstrap';



class UserAccessData extends React.Component {

    render() {
       
        return (
            <tbody>                      
                <tr>
                    <td>{this.props.user.email}</td>
                    <td>{this.props.user.first_name}</td>
                    <td>{this.props.user.last_name}</td>
                    <td><Input type="checkbox" name="checkbox" id="access" onClick={this.toggleCheckbox} /><Label for="access"></Label></td>
                    <td><Input type="checkbox" name="checkbox1" id="access1" onClick={this.toggleCheckbox}/><Label for="access1"></Label></td>
                    <td><Input type="checkbox" name="checkbox2" id="access2" onClick={this.toggleCheckbox}/><Label for="access2"></Label></td>
                </tr>
            </tbody>
        )
    }
}


export default UserAccessData