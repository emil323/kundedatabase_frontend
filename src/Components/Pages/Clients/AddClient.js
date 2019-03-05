import React, {Component} from "react";
import { connect } from "react-redux";
import "./Clients.css"
import { fetchClientsData, toggleModal} from '../../../Store/Actions/clientsActions'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';

import API from "../../../API/API";

class AddClient extends Component {
    
    constructor(){
        super();
        this.state = {
            firmanavn: "",
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
      
        if(this.state.firmanavn !== ""){
            API.clients().create({client: this.state.firmanavn})
            .then(res => {
              console.log(res)
              this.props.toggleModal()
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
            <Modal centered isOpen={this.props.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggleModal}>Opprett ny kunde</ModalHeader>
                <ModalBody>
                    <Input type="text" name="firmanavn" placeholder="Firmanavn" id="firmanavn" onChange={this.handleChange} value={this.state.firmanavn}/>
                </ModalBody>
                <ModalFooter>
                   
                    <Button color="primary" onClick={this.handleSubmit}>Lagre</Button>
                    <Button color="secondary" onClick={this.props.toggleModal}>Lukk</Button>
                </ModalFooter>
            </Modal>
        </div>
        
        )
    }
}


// Calls on a clientsReducer that bring props to the component
const mapStateToProps = (state) => {
    const { modal } = state.clientsReducer
    return {
        modal
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        fetchClientsData: () => {dispatch(fetchClientsData())},
        toggleModal: () => {dispatch(toggleModal())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddClient)