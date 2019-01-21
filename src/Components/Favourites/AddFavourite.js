import React, { Component } from 'react'

class AddFavourite extends Component {
  state = {
    name: null,
    age: null,
    belt: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addFavourite(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div className="container">
            <label htmlFor="logo">Logo name:</label>
            <input type="text" id="logo" onChange={this.handleChange} />
            <label htmlFor="client">Client:</label>
            <input type="text" id="client" onChange={this.handleChange} />
            <button>Submit</button>
        </div>
        </form>
      </div>
    )
  }
}

export default AddFavourite