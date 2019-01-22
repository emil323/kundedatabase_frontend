import React from 'react'
import {Component} from 'react'
import FavouritesCard from "./FavouritesCard"
import { Container, Row, Col } from 'reactstrap';

class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            favourites: [
                {
                    name: "Jan H",
                    company: "USN",
                    description: "Bachelor, ends in 2019"
                },
                {
                    name: "Kriss H",
                    company: "USN",
                    description: "Bachelor, ends in 2019"
                },
                {
                    name: "Joakim S",
                    company: "USN",
                    description: "Bachelor, ends in 2019"
                }
            ]
        }
    }

    render () {
        let favouritesCards = this.state.favourites.map(favourite => {
          return (
            <Col sm="4">
              <FavouritesCard key={favourite.id}  favourite={favourite} />
            </Col>
          )
        })
        return (
          <Container fluid>
            <Row>
              {favouritesCards}
            </Row>
          </Container>
        )
      }

}

export default Favourites;