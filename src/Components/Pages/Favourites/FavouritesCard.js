import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class FavouriteCard extends Component {
  render(){
    let {name, company, description} = this.props.favourite;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{company}</CardSubtitle>
            <CardText>{description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  };
}


export default FavouriteCard;