import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './Jumbotron.css';


const Welcome = (props) => {
    return (
        <div>
            <Jumbotron className="Jumbotron-Home">
                    <h1 className="display=3">Velkommmen!</h1>
                    <p className="lead">Velkomstmelding</p>
                    <hr className="my-2" />
                    <p>Brødtekst</p>
                    <p className="lead">
                        <Button color="info">Knapp</Button>
                    </p>
            </Jumbotron>

        </div>
    )
}

export default Welcome;