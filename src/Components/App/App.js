import React from 'react'
import {Component} from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Header from '../Navigation/Header/Header'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import Breadcrumbs from '../Navigation/Breadcrumbs/Breadcrumbs'
import MainContent from './MainContent/MainContent'

import Home from "../Pages/Home/Home"
import Clients from "../Pages/Clients/Clients"
import Client from "../Pages/Client/Client"
import UserAccess from '../Pages/UserAccess/UserAccess'
import AccessLog from '../Pages/AccessLog/AccessLog'
import File from '../Pages/File/File'
import './App.css'



class App extends Component {
      render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    {/* <Sidebar /> */} 
                        <MainContent>
                        <Route exact path="/" component={Home} />
                        <Route path="/clients" component={Clients}/>
                        <Route path="/client/:client_id" component={Client}/>
                        <Route path="/useraccess" component={UserAccess}/>
                        <Route path="/accesslog" component={AccessLog}/>
                        <Route path="/client/:client_id/accesslog" component={AccessLog}/>
                        <Route path="/file/:file_id" component={File}/>

                    </MainContent>
                </div>
            </BrowserRouter>
        )
      }
}
    
export default App




