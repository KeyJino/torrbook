import React from 'react';
import {inject} from "mobx-react/index";

@inject('userService')
export default class Moder extends React.Component{

	render() {

		const user = this.props.user;

		return (
			<div>
				<h1> {user.username} </h1>
				<h2> Books on hand: {user.bookTaken}</h2>
				<h2> Total books: {user.bookGiven}</h2>
				<h2> Rating: {user.bookGiven + user.bookTaken}</h2>
			</div>
		)
	}

}