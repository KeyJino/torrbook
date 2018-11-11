import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

@inject("authStore")
@observer
export default class Header extends React.Component {

	logOut() {
		this.props.authStore.logOut();
	}

	render() {
		const {user} = this.props.authStore;
		return (
			<div>
				{
					this.props.authStore.user !== null &&
					sessionStorage.getItem('user') !== null
						?
						<div>
							<Link to="/request"> Запросы </Link>
							<Link to="/user"> User </Link>
							<Link to="/books"> Books </Link>
							{user && <button onClick={this.logOut.bind(this)}>Выйти</button>}
						</div>

						: null
				}
			</div>
		);
	}
}