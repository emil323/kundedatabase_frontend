import React from 'react'
import { Input, Label } from 'reactstrap';

class UserAccessData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <tbody>                      
                <tr>
                    <th>1</th>
                    <td>Test</td>
                    <td><Input class="checkbox" type="radio" name="radio" id="access" onClick={this.toggleCheckbox} /><Label for="access"></Label></td>
                    <td><Input class="checkbox"  type="radio" name="radio1" id="access1" onClick={this.toggleCheckbox}/><Label for="access1"></Label></td>
                </tr>
            </tbody>
        )
    }
}


export default UserAccessData