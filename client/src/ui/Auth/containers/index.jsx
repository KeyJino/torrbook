import React from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import User from "../components/User";
import Moder from "../components/Moder";
import Admin from "../components/Admin";

/**
 * Auth component. personal page to user.
 */
@inject('authStore', 'userService')
@observer
export default class Auth extends React.Component {
	render() {
		const {user} = this.props.authStore;
		const role = this.props.userService.checkRole;

		return user == null ? <Redirect to='/torrbook/#'/> : (
			<div>
				<div>
				{
					role('USER') ? <User user={user}/> :
						role('MODER') ? <Moder user={user}/> :
							role('ADMIN') ? <Admin user={user}/> : null
				}
				</div>
				<div>

				</div>
			</div>
		);
	}
}