import React from 'react'
import Kebab from '../../../Assets/Icons/kebab-hor.png'
import DropdownBtn from '../../Shared/DropdownBtn/DropdownBtn'
import {withRouter} from "react-router-dom"


class UserAccessData extends React.Component {

    render() {

        const btnOptions = [
            {
                tekst: 'Adgangslogg',
                isHeader: 0,
                key: 0,
                function: (e) => { this.props.history.push('/accesslog/consultant/' + this.props.user.id) }
            }
        ]
       
        return (
            <tbody key={this.props.user.id}>                      
                <tr>
                    <td>
                    <strong>{this.props.user.first_name} {this.props.user.last_name}</strong><br/>
                    {this.props.user.email}<br/>
                    <em>{this.props.user.is_admin ? 'Administrator' : ''}</em>
                    </td>
                    <td className="td-btn"><DropdownBtn icon={Kebab} options={btnOptions} /></td>
                </tr>
            </tbody>
        )
    }
}


export default withRouter(UserAccessData)