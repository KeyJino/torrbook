import React from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
import User from "../components/User";
import Moder from "../components/Moder";
import Admin from "../components/Admin";
import * as i18next from "i18next";

/**
 * Auth component. personal page to user.
 */
@inject('authStore', 'userService')
@observer
export default class Auth extends React.Component {


	render() {

		const {user} = this.props.authStore;
		const role = this.props.userService.checkRole;

		return user == null ? <Redirect to="/"/> : (
			<div>
				{
					role('USER') ? <User/> :
						role('MODER') ? <Moder/> :
							role('ADMIN') ? <Admin/> : null
				}
			</div>
		);
	}
}