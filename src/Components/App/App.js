import React from 'react'
import {Component} from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContent from '../MainContent/MainContent'

import Home from "../Home/Home"
import Clients from "../Clients/Clients"
import Favourites from "../Favourites/Favourites"

import './App.css'

class App extends Component {
 
      render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Sidebar />
                    <MainContent>
                        <Route exact path="/" component={Home} />
                        <Route path="/favourites" component={Favourites} />
                        <Route path="/clients" component={Clients}/>
                    </MainContent>
                </div>
            </BrowserRouter>
        )
      }
}
    
export default App;




