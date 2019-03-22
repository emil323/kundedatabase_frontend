import React, { Component } from 'react';
import {
	Card, CardImg, CardBody, CardImgOverlay, CardTitle, CardLink, CardFooter, CardText, CardHeader
} from 'reactstrap';
import { Link } from "react-router-dom"
import NavBtn from '../../../Shared/NavBtn/NavBtn'

class FavouriteCard extends Component {
	render() {
		let { name, client_id } = this.props.favourite;
		return (

			<Card>
				<CardBody>
					<CardTitle><Link to={"./client/" + client_id + "/files"}><h5>{name}</h5></Link></CardTitle>
				</CardBody>
				<CardFooter className="card-footer">
					<Link to={"./client/" + client_id + "/files"}><NavBtn img="Folder" isCard /></Link>
					<Link to={"./accesslog/client/" + client_id}><NavBtn img="AccessLogBlack" isCard /></Link>
					<Link to={"./client/" + client_id + "/recyclebin"}><NavBtn img="TrashBlack" isCard /></Link>
				</CardFooter>
			</Card>
		);
	};
}


export default FavouriteCard;