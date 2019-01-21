import React from 'react'
import {Component} from 'react'
import { Route } from "react-router-dom"
import Home from "../Home/Home"
import Clients from "../Clients/Clients"
import {Row, Col} from 'reactstrap';
import Favourites from "../Favourites/Favourites"

class MainContent extends Component {
 
      render () {
        return (
            <div>
                <Col sm={{ size:9, order:1,offset: 3 }} xl={{size:11,  offset: 1}}>
                    <Row>
                            {this.props.children}
                    </Row>
                </Col>
            </div>
        )
      }
}
    
export default MainContent;




