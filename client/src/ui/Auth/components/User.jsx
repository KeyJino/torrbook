import React from 'react';
import {inject} from "mobx-react";

/**
 * User component to switch here table header.
 */
@inject('userService')
export default class User extends React.Component {
	render() {
		const user = this.props.user;
		return (
			<div>
				<h1> {user.username} </h1>
				<h2> Books taken: {user.bookTaken}</h2>
				<h2> Books given away: {user.bookGiven}</h2>
				<h2> rating: {user.bookGiven - user.bookTaken}</h2>
			</div>
		)
	}
}