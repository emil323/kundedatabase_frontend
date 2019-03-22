import api from '../../API/API'
import {FETCH_FAVOURITES, SEARCH_KEY, IS_LOADING} from '../types'



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

export const setIsLoading = (is_loading) => {
    return {
        type: IS_LOADING,
        is_loading
    }
}


export const fetchFavouritesData = () => {
    return (dispatch) => {
        dispatch(setIsLoading(true))
        return api.favourites().list()
            .then(response => {
                dispatch(fetchFavourites(response.data))
                dispatch(setIsLoading(false))
            })
            .catch(error => {
                throw(error)
            })
    }
}