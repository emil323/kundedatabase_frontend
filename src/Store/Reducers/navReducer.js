
import {UPDATE_NAV} from '../types'

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
    searchValue:''
}

// Reducers are called when a change happens. The reducers changes the initial state
const accesslogReducer = (state = initState, action) => {
    switch(action.type){
        case UPDATE_NAV:
            return action.options
        default:
            return state
    }
}

export default accesslogReducer