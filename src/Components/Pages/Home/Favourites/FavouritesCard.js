import React, { Component } from 'react';
import {
	Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
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
					<Link to={"./client/" + client_id + "/files"}><NavBtn img="Folder" contextClass="card" /></Link>
					<Link to={"./accesslog/client/" + client_id}><NavBtn img="AccessLog" contextClass="card" /></Link>
					<Link to={"./client/" + client_id + "/recyclebin"}><NavBtn img="Trash" contextClass="card" /></Link>
				</CardFooter>
			</Card>
		);
	};
}


export default FavouriteCard;