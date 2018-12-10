import React from 'react';
import {inject} from "mobx-react/index";
import {Spring} from "react-spring";

@inject('userService')
export default class Moder extends React.Component {

	render() {

		const user = this.props.user;

		return (
			<div>
				<divr>
					<h1>{user.username}</h1>
					<h2> Books on hand: {user.bookGiven}</h2>
					<h2> Total books: {user.bookTaken}</h2>
					<h2> Rating: {user.bookGiven + user.bookTaken}</h2>
				</divr>}
			</div>
		)
	}

}