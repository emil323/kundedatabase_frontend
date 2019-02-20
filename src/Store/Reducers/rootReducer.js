import { combineReducers } from "redux"

import clientsReducer from "./clientsReducer"
import filesReducer from "./filesReducer"
import usersReducer from "./usersReducer"
import accesslogReducer from "./accesslogReducer"
import modalReducer from './modalReducer'
import recyclebinReducer from './recyclebinReducer'

// Combine reducers into a single reducer. 
// Remember that reducers are props based. So if you want to change the state of something you do it using this.props in the component
const rootReducer = combineReducers({
    clientsReducer,
    filesReducer,
    usersReducer,
    accesslogReducer,
    modalReducer,
    recyclebinReducer
})


export default rootReducer