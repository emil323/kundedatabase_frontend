import { combineReducers } from "redux"

import clientsReducer from "./clientsReducer"
import filesReducer from "./filesReducer"

// Combine reducers into a single reducer. 
// Remember that reducers are props based. So if you want to change the state of something you do it using this.props in the component
const rootReducer = combineReducers({
    clientsReducer: clientsReducer,
    filesReducer: filesReducer
})


export default rootReducer