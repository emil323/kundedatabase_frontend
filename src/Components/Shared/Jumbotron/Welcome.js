import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './Jumbotron.css';
import { authContext } from '../../../API/Auth/adalConfig';
import {formatDate} from '../../Helpers/Formatting/DateHelper'


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
                <Jumbotron className="Jumbotron-Home">
                        <h1 className="display=3">Velkommmen {this.state.name}!</h1>
                        <hr className="my-2" />
                        <p className="lead">{formatDate(curDate)}</p>                    
                </Jumbotron>
        )
    }
    componentDidMount() {
        this.setState({email: authContext.getCachedUser().userName,
                       name: authContext.getCachedUser().profile.name })
    }
}


export default (Welcome);