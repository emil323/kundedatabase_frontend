
import {FETCH_ACCESS_LOG, ADD_LOG_ITEM, IS_LOADING} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    accesslog: [],
    search: ''
}

// Reducers are called when a change happens. The reducers changes the initial state
const accesslogReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_LOG_ITEM:
            return {
                ...state,
                logItem: [...state.accesslog, action.logItem.logItem]
            }
        case FETCH_ACCESS_LOG:
            return { ...state,
                accesslog: action.accesslog.accesslog
            }
        case IS_LOADING:
            return {
                ...state,
                is_loading: action.is_loading
            }    
        default:
            return state
    }
}

export default accesslogReducer