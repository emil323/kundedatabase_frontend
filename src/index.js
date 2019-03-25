
import React from 'react'
import ReactDOM from 'react-dom'
import { runWithAdal} from 'react-adal';
import { authContext } from './API/Auth/adalConfig';
import App from './Components/App/App.js'
import * as serviceWorker from './serviceWorker'

import { Provider } from "react-redux"
import store from './Store/store'

import './CSS/index.css';
import './CSS/modal.css';

//
//Set this to true to ignore authentication
const DO_NOT_LOGIN = false;



// Wrap store into the application using a Provider
runWithAdal(authContext, () => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
},DO_NOT_LOGIN);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
