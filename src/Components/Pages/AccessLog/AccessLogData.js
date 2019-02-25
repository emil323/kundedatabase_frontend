import React from 'react'

class AccessLog extends React.Component {
    render() {
       
        return (
            <tbody>
                <tr>
                    <td>{this.props.log.client_name}</td>
                    <td>{this.props.log.file_name}</td>
                    <td>{this.props.log.first_name} {this.props.log.last_name}</td>
                    <td>{this.props.log.ip}</td>
                    <td>{this.props.log.timestamp}</td>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog