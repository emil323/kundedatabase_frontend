import React from 'react'

class AccessLog extends React.Component {


    formatDate(date) {
        const format = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString('no-NO', format)
    }

    render() {
        
        
        return (
            <tbody id="accesslogTbody">
                <tr id="accesslogTr">
                    <td class="accesslogTd">{this.props.log.client_name}</td>
                    <td class="accesslogTd">{this.props.log.file_name.substring(0, 20)}</td>
                    <td class="accesslogTd">{this.props.log.first_name} {this.props.log.last_name}</td>
                    <td class="accesslogTd">{this.props.log.ip}</td>
                    <td class="accesslogTd">{this.formatDate(this.props.log.timestamp)}</td>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog