import React from 'react'
import { Link } from 'react-router-dom'

class AccessLog extends React.Component {


    formatDate(date) {
        const format = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString('no-NO', format)
    }

    render() {
        
        const log = this.props.log 

        return (
            <tbody id="accesslogTbody">
                <tr id="accesslogTr">
                    <td class="accesslogTd"><Link to={`/client/${log.client_id}/files`}> {log.client_name}</Link></td>
                    <td class="accesslogTd"><Link to={`/file/${log.file_id}`}>{this.props.log.file_name.substring(0, 20)}</Link></td>
                    <td class="accesslogTd"><Link to={`/accesslog/consultant/${log.consultant_id}`}>{this.props.log.first_name} {this.props.log.last_name}</Link></td>
                    <td class="accesslogTd"><Link to={`/accesslog/ip/${log.ip}`}>{this.props.log.ip}</Link></td>
                    <td class="accesslogTd">{this.formatDate(this.props.log.timestamp)}</td>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog