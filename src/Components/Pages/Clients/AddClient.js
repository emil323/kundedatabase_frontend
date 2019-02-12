import React, {Component} from "react";
import { connect } from "react-redux";
import "./Clients.css"
import { addClientData, fetchClientsData} from '../../../Store/Actions/clientActions'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from "react-router-dom"

import API from "../../../API/API";

class AddClient extends Component {
    
    
    constructor(){
        super();
        this.state = {
            firmanavn: "",
            modal: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    handleChange = (e) => {
        console.log([e.target.value]);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
      
        if(this.state.firmanavn !== ""){
            API.clients().create({client: this.state.firmanavn})
            .then(res => {
              console.log(res)
              this.toggle()
              this.props.fetchClientsData()
              this.setState({
                  firmanavn: ''
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
     
       
    }

    render(){
        return (
        <div>
            <Button className="modalBtn" color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Opprett ny kunde</ModalHeader>
                <ModalBody>
                    <Label for="firmanavn">Firmanavn:</Label>
                    <Input type="text" name="firmanavn" id="firmanavn" onChange={this.handleChange} value={this.state.firmanavn}/>
                </ModalBody>
                <ModalFooter>
                   
                    <Button color="primary" onClick={this.handleSubmit}>Lagre</Button>
                    <Button color="secondary" onClick={this.toggle}>Lukk</Button>
                </ModalFooter>
            </Modal>
        </div>
        
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return { 
        addClientData: (client) => { dispatch(addClientData(client))},
        fetchClientsData: () => {dispatch(fetchClientsData())},

    }
}


export default connect(null, mapDispatchToProps)(AddClient)