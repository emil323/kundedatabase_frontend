
import {SET_TRAIL, PUSH_TRAIL} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    trail : [{
        title: '',
        path: ''
    }]
}

// Reducers are called when a change happens. The reducers changes the initial state
const clientsReducer = (state = initState, action) => {
    console.log(action)
    switch(action.type){
        case SET_TRAIL:
            return {  
                trail : action.trail 
            }
        case PUSH_TRAIL:
            return {
                trail : [...state.trail, {title: action.title, path: action.path}]
            }
        default:
            return state
    }
}

export default clientsReducer