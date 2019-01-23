import React from 'react'
import ReactDOM from 'react-dom'
import { runWithAdal } from 'react-adal';
import { authContext } from './Auth/adalConfig';
import App from './Components/App/App.js'
import * as serviceWorker from './serviceWorker'

//Set this to true to ignore authentication
const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {
    ReactDOM.render(<App />, document.getElementById('root'))
},DO_NOT_LOGIN);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
