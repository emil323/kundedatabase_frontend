import React from 'react';
import { Jumbotron } from 'reactstrap';
import './Jumbotron.css';
import { authContext } from '../../../API/Auth/adalConfig';
import {formatDate} from '../../Helpers/Formatting/DateHelper'


class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            name: null,
            time: new Date()
        }

        this.getGreeting = this.getGreeting.bind(this)
    }

    getGreeting() {
        const hour = this.state.time.getHours()

        if(hour >= 18) { return "God kveld, "}
        if(hour >= 12) { return "God ettermiddag, " }
        if(hour >= 9) { return "God formiddag, " }
        if(hour >= 6) { return "God morgen, " }
        if(hour < 6) { return "God natt," }        
    }


    render(){
        var curDate = Date();
        return (
                <Jumbotron className="Jumbotron-Home">
                        <h5>{this.getGreeting() + this.state.name}</h5>
                        {console.log(curDate)}
        
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