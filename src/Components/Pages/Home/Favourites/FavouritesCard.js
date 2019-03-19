import React, { Component } from 'react';
import {
	Card, CardImg, CardBody, CardImgOverlay, CardTitle, CardLink, CardFooter, CardText, CardHeader
} from 'reactstrap';
import { Link } from "react-router-dom"
import NavBtn from '../../../Shared/NavBtn/NavBtn'
import PlaceholderWide from '../../../../Assets/ClientLogos/placeholder_wide.png'

class FavouriteCard extends Component {
	render() {
		let { name, client_id } = this.props.favourite;
		return (

			<Card>
				{/* <CardHeader><h5>{name}</h5></CardHeader> */}
				{/* <CardImg top width="100%" src={PlaceholderWide} /> */}

				<CardBody>
					<CardTitle><Link to={"./client/" + client_id + "/files"}><h5>{name}</h5></Link></CardTitle>
				</CardBody>
				<CardFooter className="card-footer">
					<Link to={"./client/" + client_id + "/files"}><NavBtn img="Folder" isCard /></Link>
					<Link to={"./accesslog/client/" + client_id}><NavBtn img="AccessLog" isCard /></Link>
					<Link to={"./client/" + client_id + "/recyclebin"}><NavBtn img="RecycleBin" isCard /></Link>
				</CardFooter>
			</Card>
		);
	};
}


export default FavouriteCard;