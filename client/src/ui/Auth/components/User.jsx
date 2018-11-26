import React from 'react';
import {inject} from "mobx-react";

@inject('userService')
export default class User extends React.Component {

	render() {
		return (
				<div>
					User
				</div>
		)
	}
}