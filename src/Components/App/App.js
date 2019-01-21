import React from 'react'
import {Component} from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './App.css'
import { BrowserRouter, Route } from "react-router-dom"
import Home from "../Home/Home"
import Clients from "../Clients-folder/Clients"
import {Row } from 'reactstrap';
import Favourites from "../Favourites/Favourites"

class App extends Component {
 
      render () {
        return (
            <BrowserRouter> 
                <div>
                    <Header />
                    <Sidebar />
                    <div className="container">                
                        <Row>
                            <Route exact path="/" component={Home} />
                            <Route path="/favourites" component={Favourites} />
                            <Route path="/clients" component={Clients}/>
                        </Row>
                    </div>
                </div>
            </BrowserRouter> 
        )
      }
}
    
export default App;




