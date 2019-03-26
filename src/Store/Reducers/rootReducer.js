import { combineReducers } from "redux"

import clientsReducer from "./clientsReducer"
import clientReducer from "./clientReducer"
import filesReducer from "./filesReducer"
import usersReducer from "./usersReducer"
import accesslogReducer from "./accesslogReducer"
import modalReducer from './modalReducer'
import recyclebinReducer from './recyclebinReducer'
import breadcrumbReducer from './breadcrumbReducer'
import favouritesReducer from './favouritesReducer'
import navReducer from './navReducer'

// Combine reducers into a single reducer. 
// Remember that reducers are props based. So if you want to change the state of something you do it using this.props in the component
const rootReducer = combineReducers({
    clientsReducer,
    clientReducer,
    filesReducer,
    usersReducer,
    accesslogReducer,
    modalReducer,
    recyclebinReducer,
    breadcrumbReducer,
    favouritesReducer,
    navReducer
})


export default rootReducer