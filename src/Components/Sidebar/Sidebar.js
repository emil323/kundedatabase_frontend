import React from 'react'
import {Component} from 'react'
import {Nav, Row, Col} from 'reactstrap'
import { Link } from "react-router-dom"
import Menu from '../Menu/Menu'
import './Sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col xs="12" sm="3" xl="1" className="sidebar hidden-xs">
                        <Nav vertical>
                            <Menu/>
                        </Nav>
                    </Col>
              </Row>
            </div>
            
        )
    }
}

export default Sidebar