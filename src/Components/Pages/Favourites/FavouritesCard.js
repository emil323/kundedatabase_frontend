import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from "react-router-dom"

class FavouriteCard extends Component {
  render(){
    let {name, company, description} = this.props.client;
    return (
      <div>
        <Card>
          <Link to={"./client/" + this.props.client.id}  style={{ textDecoration: 'none'}}>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{company}</CardSubtitle>
            <CardText>{description}</CardText>
          </CardBody>
          </Link>
        </Card>
      </div>
    );
  };
}


export default FavouriteCard;