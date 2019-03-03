import React, { Component } from 'react';
import { Card, CardImg, CardBody,
  CardTitle } from 'reactstrap';
import { Link } from "react-router-dom"

class FavouriteCard extends Component {
  render(){
    let {name, client_id} = this.props.favourite;
    return (
      <div>
        <Card>
          <Link to={"./client/" + client_id + "/files"}  style={{ textDecoration: 'none'}}>
          {/*<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/ }
          <CardBody>
            <CardTitle>{name}</CardTitle>
          </CardBody>
          </Link>
        </Card>
      </div>
    );
  };
}


export default FavouriteCard;