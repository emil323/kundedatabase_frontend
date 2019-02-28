import React from 'react'
import { Component } from 'react'
import FavouritesCard from "./FavouritesCard"
import { Navbar, Input, Container, Row, Col } from 'reactstrap';
import { fetchFavouritesData, updateSearch } from '../../../Store/Actions/favouritesActions'
import { connect } from "react-redux";
import './Favourites.css'

class Favourites extends Component {

  render() {
    let filteredFavourites = this.props.favourites.filter(favourite => {
      return favourite.client_id.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
    });
    return (
      <div className="favourites">
        <Navbar sticky="top">
          <Input placeholder="Søk etter favoritt" type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this)} />
        </Navbar>
        <Container fluid>
          <Row>
            {
              filteredFavourites.map(favourite => {
                return <Col sm="4"><FavouritesCard key={favourite.client_id} favourite={favourite} /></Col>
              })
            }

          </Row>
        </Container>
      </div>
    )
  }
  //Calls fetchFavouritesData() immedeatly when loading the component, this agains gets the data from the API
  componentDidMount() {
    this.props.fetchFavouritesData()
  }
}

// Calls on a favouritesReducer that bring props to the component
const mapStateToProps = (state) => {
  return {
    favourites: state.favouritesReducer.favourites,
    search: state.favouritesReducer.search
  }
}

// Create a dispatch which sends information to the reducer.
const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavouritesData: () => { dispatch(fetchFavouritesData()) },
    updateSearch: (search_key) => { dispatch(updateSearch(search_key)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Favourites)