import React from 'react'
import {Component} from 'react'
import FavouritesCard from "./FavouritesCard"
import { Container, Row, Col } from 'reactstrap';
import {fetchClientsData, updateSearch} from '../../../Store/Actions/clientActions'
import { connect } from "react-redux";
import './Favourites.css'

class Favourites extends Component {

    render () {
      let filteredClients = this.props.clients.filter(client => {
        return client.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
      });
        return (
          <div className="favourites">
          <input placeholder="Søk etter favoritt.." type="text" value={this.props.search} onChange={this.props.updateSearch.bind(this)}/>
            <Container fluid>
              <Row>
              {
              filteredClients.map(client => {
                return  <Col sm="4"><FavouritesCard key={client.id}  client={client} /></Col>
              })
              }
  
              </Row>
            </Container>
          </div>
        )
      }
       //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
    componentDidMount() {
      this.props.fetchClientsData()
  }

}

// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
  return {
      clients: state.clientsReducer.clients,
      search: state.clientsReducer.search
  }
}

// Create a dispatch which sends information to the reducer. In this case a client is being deleted
const mapDispatchToProps = (dispatch) => {
  return {
      fetchClientsData: () =>{ dispatch(fetchClientsData())},
      updateSearch:(search_key) => {dispatch(updateSearch(search_key))}}}



export default connect(mapStateToProps, mapDispatchToProps)(Favourites)