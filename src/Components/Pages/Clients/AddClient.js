import React, {Component} from "react";


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
        this.setState({
         firmanavn: '',
         kontaktperson: '',
         sistendret: ''
        })
    }

    render(){
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>Legg til ny kunde:</label>
                <input type="text" name="firmanavn" onChange={this.handleChange} value={this.state.firmanavn}/>
                <input type="text" name="kontaktperson" onChange={this.handleChange} value={this.state.kontaktperson}/>
                <input type="text" name="sistendret" onChange={this.handleChange} value={this.state.sistendret}/>
                <button onClick={this.handleSubmit}>Legg til kunde</button>
            </form>
        </div>
        )
    }
}

export default AddClient