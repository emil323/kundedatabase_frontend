import React from 'react'
import { Link } from 'react-router-dom'
import {formatDate} from '../../Helpers/Formatting/DateHelper'

class AccessLog extends React.Component {
    render() {
        
        const log = this.props.log 
        console.log(log)
        return (
            <tbody id="accesslogTbody">
                <tr id="accesslogTr">
                    <td class="accesslogTd"><Link to={`/accesslog/client/${log.client_id}`}> {log.client_name}</Link></td>
                    {log.type === 'CLIENT_METADATA' 
                    ? <td class="accesslogTd"><Link to={`/accesslog/file/${log.file_id}`}>Strukturert data</Link></td>
                    : <td class="accesslogTd"><Link to={`/accesslog/file/${log.file_id}`}>{this.props.log.file_name}</Link></td>
                    }
                    <td class="accesslogTd"><Link to={`/accesslog/consultant/${log.consultant_id}`}>{this.props.log.first_name} {this.props.log.last_name}</Link></td>
                    <td class="accesslogTd"><Link to={`/accesslog/ip/${log.ip}`}>{this.props.log.ip}</Link></td>
                    <td class="accesslogTd">{formatDate(this.props.log.timestamp)}</td>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog