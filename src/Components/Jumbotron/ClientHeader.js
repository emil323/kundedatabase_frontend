import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

class ClientHeader extends Component {
    render() {
        return (
            <Jumbotron>
                <h1 className="display-3">{this.props.clientName}</h1>
            </Jumbotron>
        );
    }
}

export default ClientHeader;