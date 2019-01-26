import React, {Component} from "react";


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
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>Legg til ny fil:</label>
                <input type="text" name="tittel" onChange={this.handleChange} value={this.state.tittel}/>
                <input type="text" name="type" onChange={this.handleChange} value={this.state.type}/>
                <input type="text" name="sistendret" onChange={this.handleChange} value={this.state.sistendret}/>
                <button onClick={this.handleSubmit}>Legg til Fil:</button>
            </form>
        </div>
        )
    }
}

export default AddFile