import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import './Jumbotron.css';

class ClientHeader extends Component {
    render() {
        return (
            <Jumbotron className="Jumbotron-Client">
                <h1 className="display-3">{this.props.clientName}</h1>
            </Jumbotron>
        );
    }
}

export default ClientHeader;