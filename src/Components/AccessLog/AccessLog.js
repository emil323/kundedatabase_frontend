import React from 'react'

class AccessLog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <tbody>
                <tr>
                    <td>{this.props.log.client}</td>
                    <td>{this.props.log.file}</td>
                    <td>{this.props.log.first_name} {this.props.log.last_name}</td>
                    <td>{this.props.log.ip}</td>
                    <td>{this.props.log.time_stamp}</td>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog