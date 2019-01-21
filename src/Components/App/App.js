import React from 'react'
import {Component} from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import './App.css'
import { BrowserRouter, Route } from "react-router-dom"
import Home from "../Home/Home"
import Favourites from "../Favourites/Favourites"
import AddFavourite from "../Favourites/AddFavourite"
import Clients from "../Clients-folder/Clients"

class App extends Component {
    state = {
        favourites: [
            {id: 1, logo: "reserved", client: "test1"},
            {id: 2, logo: "reserved", client: "test2"}
        ]
    }

    addFavourite = (favourite) => {
        favourite.id = Math.random();
        let favourites = [...this.state.favourites, favourite];
        this.setState({
          favourites: favourites
        });
      }

    render() {
        return (
            <BrowserRouter> 
                <div className="App">
                    <Header/>
                    <Sidebar/>
                    <Route exact path="/" component={Home} />
                    <Route path="/favourites" component={Favourites} />
                    <Favourites favourites={this.state.favourites}/>
                    <AddFavourite addFavourite={this.addNinja} />
                    <Route path="/clients" component={Clients} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App