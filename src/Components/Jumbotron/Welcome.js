import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './Jumbotron.css';
import { authContext } from './../../Auth/adalConfig';



class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            name: null
        }
    }
    render(){
        var curDate = Date();
        return (
            <div>
                <Jumbotron className="Jumbotron-Home">
                        <h1 className="display=3">Velkommmen {this.state.name}!</h1>
                        <p className="lead">{curDate}</p>
                        <hr className="my-2" />
                      {/*   <p>Brødtekst</p>
                        <p className="lead">
                            <Button color="info">Knapp</Button>
                        </p> */}
                </Jumbotron>
    
            </div>
        )
    }
    componentDidMount() {
        this.setState({email: authContext.getCachedUser().userName,
                       name: authContext.getCachedUser().profile.name })
    }
}


export default (Welcome);