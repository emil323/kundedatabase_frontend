import React from 'react'
import { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import './MainContent.css';

class MainContent extends Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default MainContent;




