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

        this.formatDate = this.formatDate.bind(this)
    }

    formatDate(date) {
        const format = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString('no-NO', format)
    }

    render(){
        var curDate = Date();
        return (
            <div>
                <Jumbotron className="Jumbotron-Home">
                        <h1 className="display=3">Velkommmen {this.state.name}!</h1>
                        <hr className="my-2" />
                        <h2 className="lead">{this.formatDate(curDate)}</h2>                    
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