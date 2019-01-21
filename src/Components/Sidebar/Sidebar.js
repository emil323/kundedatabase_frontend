import React from 'react'
import {Component} from 'react'
import {Nav, Row, Col} from 'reactstrap'
import { Link } from "react-router-dom"
import './Sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col xs="12" sm="3" xl="1" className="sidebar">
                        <Nav vertical>
                            <p>Jan Helgsen</p>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/Favourites">Favourites</Link></li>
                                <li><Link to="/Clients">Clients</Link></li> 
                            </ul>
                        </Nav>
                    </Col>
              </Row>
              <Row>
                  <Col sm={{ size:11, order:1,offset: 3 }} xl={{size:11,  offset: 1}} className="main">
                  <h1>Test</h1>
                  </Col>
              </Row>
            </div>
            
        )
    }
}

export default Sidebar