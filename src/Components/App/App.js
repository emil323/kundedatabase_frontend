import React from 'react'
import {Component} from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import MainContent from '../Wrappers/MainContent/MainContent'

import Home from "../Pages/Home/Home"
import Clients from "../Pages/Clients/Clients"
import Favourites from "../Pages/Favourites/Favourites"


import './App.css'

class App extends Component {
      render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Sidebar />
                    <MainContent>
                        <Breadcrumbs />
                        <Route exact path="/" component={Home} />
                        <Route path="/favourites" component={Favourites} />
                        <Route path="/clients" component={Clients}/>
                    </MainContent>
                </div>
            </BrowserRouter>
        )
      }
}
    
export default App




