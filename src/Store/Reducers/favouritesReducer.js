
import {ADD_FAVOURITE, SEARCH_KEY, FETCH_FAVOURITES} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    favourites: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const favouritesReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [...state.favourites, action.favourite.favourite]
            }
        case FETCH_FAVOURITES:
            return { ...state, 
                favourites: action.favourites.favourites
            }
        case SEARCH_KEY:
            return {
                ...state,
                search: action.search_key    
            }
        default:
            return state
    }
}

export default favouritesReducer