import React, {Component} from "react";
import { connect } from "react-redux";
import "./Clients.css"
import { addClient, fetchClientsData} from '../../../Store/Actions/clientsActions'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from "react-router-dom"

class AddClient extends Component {
    
    
    constructor(){
        super();
        this.state = {
            firmanavn: "",
            kontaktperson: "",
            sistendret: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        console.log([e.target.value]);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addClient(this.state)
        console.log(this.props)
        this.setState({
         firmanavn: '',
         kontaktperson: '',
         sistendret: ''
        })
    }

    render(){
        console.log(this.props)
        return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="firmanavn">Firmanavn:</Label>
                    <Input type="text" name="firmanavn" id="firmanavn" onChange={this.handleChange} value={this.state.firmanavn}/>
                    <Label for="kontaktperson">Kontaktperson:</Label>
                    <Input type="text" name="kontaktperson" id="kontaktperson" onChange={this.handleChange} value={this.state.kontaktperson}/>
                    <Label for="sistendret">Sist endret:</Label>
                    <Input type="text" name="sistendret" id="sistendret" onChange={this.handleChange} value={this.state.sistendret}/>
                    <br></br>
                    <Button color="primary" onClick={this.handleSubmit}>Legg til kunde</Button>
                </FormGroup>
            </Form>
            
            <Link to="./clients"><Button color="primary">Back</Button></Link>
          
        </div>
        )
    }

     //Calls fetchClientsData() immedeatly when loading the component, this agains gets the data from the API
     componentDidMount() {
        this.props.fetchClientsData()
    }
}



const mapStateToProps = (state) => {
    return {
        clients: state.clientsReducer.clients
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        addClient: (client) => { dispatch(addClient(client))},
        fetchClientsData: () =>{ dispatch(fetchClientsData())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddClient)