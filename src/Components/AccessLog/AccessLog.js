import React from 'react'

class AccessLog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <tbody>
                <tr>
                    <td>{this.props.log.first_name}</td>
                    <th>{this.props.log.id}</th>
                </tr>
          
            </tbody>
        )
    }
}


export default AccessLog