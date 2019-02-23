import api from '../../API/API'
import {ADD_FAVOURITE, FETCH_FAVOURITES, SEARCH_KEY} from '../types'


export const addFavourite = (favourite) => {
    return {
        type: ADD_FAVOURITE,
        favourite: favourite
    }
}

export const updateSearch = (e) => {
    return {
        type: SEARCH_KEY,
        search_key : e.target.value.substr(0,20)
    }
}

export const fetchFavourites = (favourites) => {
    return {
        type: FETCH_FAVOURITES,
        favourites
    }
}


export const fetchFavouritesData = () => {
    return (dispatch) => {
        return api.favourites().list()
            .then(response => {
                dispatch(fetchFavourites(response.data))
            })
            .catch(error => {
                throw(error)
            })
    }
}