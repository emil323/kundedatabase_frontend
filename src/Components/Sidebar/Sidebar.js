import React from 'react'
import {Component} from 'react'
import {Nav,NavLink, Row, Col} from 'reactstrap'
import './Sidebar.css'
import Menu from '../Menu/Menu';
class Sidebar extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col    
                            sm="3" 
                            xl="2" 
                            className="sidebar hidden-xs">
                    <Nav vertical>
                        <Menu /> 
                    </Nav>
                    </Col>
              </Row>
              <Row>
              <Col 
                        xs="12" 
                        sm={{size:9,offset:3}}
                        xl={{size:9,  offset: 2}} 
                        className="main">
                    <h1>Test</h1>
                  </Col>
              </Row>

            </div>
            
        )
    }
}

export default Sidebar