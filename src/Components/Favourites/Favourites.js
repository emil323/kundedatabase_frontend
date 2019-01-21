import React from "react"


const Favourites = ({favourites}) => {
    return (
        <div className="favouritesList">
            {
                favourites.map(favourite => {
                    return (
                        <div className="favourite">
                            <div>{favourite.logo}</div>
                            <div>{favourite.client}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favourites