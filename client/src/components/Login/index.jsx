import React from "react";
import {inject, observer} from "mobx-react";


@inject('authStore')
@observer
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
		this.password = React.createRef();
	}

	signIn() {
		this.props.authStore.signIn(this.username.current.value, this.password.current.value);
	}

	// logOut() {
	// 	this.props.authStore.logOut();
	// }
	//
	// handleUsernameChange(event) {
	// 	this.props.authStore.setUsername(event.target.value);
	// }
	//
	// handlePasswordChange(event) {
	// 	this.props.authStore.setPassword(event.target.value);
	// }

	render() {
		/*const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.props.authStore;*/

		return (
			<div>
				<form>
					<input type="text" name="username" ref={this.username}/>
					<br/>
					<input type="password" name="password" ref={this.password}/>
					<br/>
				</form>
				<button onClick={this.signIn.bind(this)}> Войти </button>
			</div>
		);
	}
}