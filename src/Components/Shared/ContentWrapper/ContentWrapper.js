import React from 'react'
import {Component} from 'react'
import {Col, Row} from 'reactstrap';

class ContentWrapper extends Component {

    render() {
        return (
            <Col sm="12" xs="12" md="12" lg={{size: '12'}} xl={{size: '10', offset: 1}}>
                {this.props.children}
            </Col>
        )
    }

}

export default ContentWrapper