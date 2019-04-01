import React from 'react'
import { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Header from '../Navigation/Header/Header'


import Home from "../Pages/Home/Home"
import Clients from "../Pages/Clients/Clients"
import Client from "../Pages/Client/Client"
import UserAccess from '../Pages/UserAccess/UserAccess'
import AccessLog from '../Pages/AccessLog/AccessLog'
import File from '../Pages/File/File'
import './App.css'
import Settings from "../Pages/Settings/Settings";
import PageNav from '../Navigation/PageNav/PageNav';
import Logout from "../Pages/Logout/Logout";



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    {/* <Sidebar /> */}
                    <PageNav/>
                    <Route exact path="/" component={Home} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/client/:client_id" component={Client} />
                    <Route path="/users" component={UserAccess} />
                    <Route path="/accesslog/:type/:id" component={AccessLog} />
                    <Route exact path="/accesslog" component={AccessLog} />
                    <Route path="/file/:file_id" component={File} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/logout" component={Logout} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App




