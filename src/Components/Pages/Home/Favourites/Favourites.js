import React from 'react'
import { Component } from 'react'
import FavouritesCard from "./FavouritesCard"
import { CardGroup, Navbar, Input, Container, Row, Col, CardDeck } from 'reactstrap';
import { fetchFavouritesData, updateSearch } from '../../../../Store/Actions/favouritesActions'
import { connect } from "react-redux";
import './Favourites.css'
import PageNav from '../../../Shared/PageNav/PageNav'




class Favourites extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		let filteredFavourites = this.props.favourites.filter(favourite => {
			return favourite.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1
		});

		const staticMenuList = []
        const collapseMenuList = []

		return (
			<div className="favourites">
			
				<PageNav
					backIsDisabled 
					searchPlaceholder={"Søk etter favoritt"}
					searchValue={this.props.search}
					searchAction={this.props.updateSearch.bind(this)}

					staticMenuBtns={staticMenuList}
                    collapseMenuBtns={collapseMenuList}
				/> 

				<Container fluid>
						<CardDeck>
							{
								filteredFavourites.map(favourite => {
									return <Col xl="3" lg="4" md="6" sm="6" xs="12"><FavouritesCard key={favourite.client_id} favourite={favourite} /></Col>
								})
							}
							</CardDeck>
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