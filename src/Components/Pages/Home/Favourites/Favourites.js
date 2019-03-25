import React from 'react'
import { Component } from 'react'
import FavouritesCard from "./FavouritesCard"
import { CardGroup, Navbar, Alert, Container, Row, Col, CardDeck } from 'reactstrap';
import { fetchFavouritesData, updateSearch } from '../../../../Store/Actions/favouritesActions'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import './Favourites.css'
import PageNav from '../../../Shared/PageNav/PageNav'




class Favourites extends Component {
	constructor(props) {
		super(props)

	}

	render() {

		const filteredFavourites = this.props.favourites.filter(favourite => {
			return favourite.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
		});

		const menuList = []


		return (
			<div className="favourites">
				<PageNav
					backIsDisabled
					searchPlaceholder={"Søk etter favoritt"}
					searchValue={this.props.search}
					searchAction={this.props.updateSearch.bind(this)}

					menuBtns={menuList}
				/>

				<Container fluid>
					<Row>
						<Col sm="12" xs="12" md="12" lg={{ size: '12' }} xl={{ size: '10', offset: 1 }}>
							<CardDeck>
								{this.props.has_favourites ?
									filteredFavourites.map(favourite => {
										return <Col xl="3" lg="4" md="6" sm="6" xs="12"><FavouritesCard key={favourite.client_id} favourite={favourite} /></Col>
									})
									: !this.props.is_loading && <Alert className='info_alert' color="light">Her kan du legge til kunder du besøker ofte. Gå til <Link to='/clients'>kundeoversikten</Link> for å legge til favoritter. </Alert>
								}
							</CardDeck>
						</Col>
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

	const { favourites, search, is_loading } = state.favouritesReducer

	const is_searching = search !== ''
	const has_favourites = favourites.length > 0

	return {
		favourites,
		search,
		is_searching,
		has_favourites,
		is_loading
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