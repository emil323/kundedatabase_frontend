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
import NewFile from "../Pages/NewFile/NewFile"
import Client from "../Pages/Client/Client"
import AddClient from '../Pages/Clients/AddClient';
import AddFile from '../Pages/Files/AddFile';

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
                        <Route path="/favourites" component={Favourites} />
                        <Route path="/clients" component={Clients}/>
                        <Route path="/addclient" component={AddClient}/>
                        <Route path="/addfile" component={AddFile}/>
                        <Route path="/client/:client_id" component={Client}/>
                    </MainContent>
                </div>
            </BrowserRouter>
        )
      }
}
    
export default App




