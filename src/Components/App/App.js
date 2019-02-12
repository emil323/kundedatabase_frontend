import React from 'react'
import {Component} from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import MainContent from '../Wrappers/MainContent/MainContent'

import Home from "../Pages/Home/Home"
import Clients from "../Pages/Clients/Clients"
import Client from "../Pages/Client/Client"
import AddClient from '../Pages/Clients/AddClient';
import UserAccess from '../Pages/UserAccess/UserAccess'

import './App.css'



class App extends Component {
      render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Sidebar />
                    <MainContent>
                        <Breadcrumbs className="hidden-lg hidden-xl hidden-md hidden-sm "/>
                        <Route exact path="/" component={Home} />
                        <Route path="/clients" component={Clients}/>
                        <Route path="/client/:client_id/:selected_folder?" component={Client}/>
                        <Route path="/useraccess" component={UserAccess}/>
                    </MainContent>
                </div>
            </BrowserRouter>
        )
      }
}
    
export default App




