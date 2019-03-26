
import {UPDATE_NAV, SEARCH_KEY} from '../types'

// A Reducer requires an initial state when running the application
const initState = {
    menuBtns: [
        {
            btnKey:0,
            btnAction:null,
            contextID:'',
            img:'',
            imgDescr:'',
            isLink:false
        }
    ],
    backAction:null,
    backDescr:'',
    backTo:'/',
    hasCollapse:false, 
    searchAction:null, 
    searchPlaceholder:'',
    search:''
}

// Reducers are called when a change happens. The reducers changes the initial state
const accesslogReducer = (state = initState, action) => {
    switch(action.type){
        case UPDATE_NAV:
            let newState = action.options 
            newState.search = state.search
            return newState
        case SEARCH_KEY:
            return {
                ...state,
                search:action.key
            }
        default:
            return state
    }
}

export default accesslogReducer