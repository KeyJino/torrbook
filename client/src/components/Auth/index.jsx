import React from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

/**
 * Auth component. personal page to user.
 */
@inject('authStore')
@observer
export default class Auth extends React.Component {


	render() {
		const {user} = this.props.authStore;
		return user == null ? <Redirect to="/"/> : (
			<div>
				{(JSON.parse(sessionStorage.getItem('user')))
					.role.title === 'ADMIN'
					? (
						<div>
							Admin
						</div>
					)
					: null
				}

				{(JSON.parse(sessionStorage.getItem('user')))
					.role.title === 'MODER'
					? (
						<div>
							Moder
						</div>
					)
					: null
				}

				{(JSON.parse(sessionStorage.getItem('user')))
					.role.title === 'USER'
					? (
						<div>
							User
						</div>
					)
					: null
				}
			</div>
		);
	}
}