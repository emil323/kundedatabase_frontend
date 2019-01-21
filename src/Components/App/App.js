import React from 'react'
import {Component} from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './App.css'

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
            </div>
        )
    }
}

export default App