import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import rootReducer from './Reducers/rootReducer'

// Create redux store using a rootReducer
const store = createStore(rootReducer, applyMiddleware(thunk))

//Export store
export default store