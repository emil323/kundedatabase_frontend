import React from 'react'
import {Component} from 'react'
import {Row, Col} from 'reactstrap';

class MainContent extends Component {
 
      render () {
        return (
            <div>
                <Col 
                 sm={{ size:12, offset:0}}
                 md={{ size:9,offset: 3 }}
                 xl={{size:10, offset: 2}}>
                    <Row>
                        {this.props.children}
                    </Row>
                </Col>
            </div>
        )
      }
}
    
export default MainContent;




