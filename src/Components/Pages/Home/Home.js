import React from "react"
import Welcome from '../../Jumbotron/Welcome';
import Favorites from '../Favourites/Favourites';

const Home = () => {
    return (
        <div className="container">
            <Welcome />
            <Favorites />
        </div>
    )

}

export default Home;