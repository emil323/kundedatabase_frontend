import React, {Component} from "react";
import { connect } from "react-redux";
import "./Files.css"
import { addFile, fetchFilesData, fetchAccessLogData} from '../../../Store/Actions/filesActions'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UploadFile from "../UploadFile/UploadFile"
import { Link } from "react-router-dom"

class AddFile extends Component {


    constructor(){
        super();
        this.state = {
            tittel: "",
            type: "",
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
        this.props.addFile(this.state)
        this.setState({
            tittel: '',
            type: '',
            sistendret: ''
        })
    }

    render(){
        console.log(this.props.match.params.selected_folder)
        return (
        <div>
        {/*     <Form onSubmit={this.handleSubmit}>
                <Label for="tittel">Tittel:</Label>
                <Input type="text" name="tittel" id="tittel" onChange={this.handleChange} value={this.state.tittel}/>
                <Label for="type">Type:</Label>
                <Input type="text" name="type" id="type" onChange={this.handleChange} value={this.state.type}/>
                <Label for="sistendret">Sist Endret:</Label>
                <Input type="text" name="sistendret" id="sistendret" onChange={this.handleChange} value={this.state.sistendret}/>
                <br></br>
                <Button color="primary" onClick={this.handleSubmit}>Legg til Fil:</Button>
            </Form> */}
            <br></br>
            <UploadFile />
            <Link to="./clients"><Button color="primary">Back</Button></Link>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.filesReducer.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        addFile: (file) => { dispatch(addFile(file))},
        fetchFilesData: () =>{ dispatch(fetchFilesData())},
        fetchAccessLogData: () => {dispatch(fetchAccessLogData)}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddFile)