import React from 'react';
import {inject} from "mobx-react/index";

/**
 * Moder component to display here header.
 */
@inject('userService')
export default class Moder extends React.Component {
	render() {
		const user = this.props.user;
		return (
			<div>
				<div>
					<h1>{user.username}</h1>
					<h2> Books gave: {user.bookGiven}</h2>
					<h2> Total books: {user.bookTaken}</h2>
					<h2> Rating: {user.bookGiven + user.bookTaken}</h2>
				</div>
				}
			</div>
		)
	}
}