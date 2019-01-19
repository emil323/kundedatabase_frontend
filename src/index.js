import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Component} from 'react';
import Bootstrap from 'bootstrap';
import * as serviceWorker from './serviceWorker';

class Button extends Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary">Button</button>
            </div>
        );
    }
}

ReactDOM.render(<Button />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
