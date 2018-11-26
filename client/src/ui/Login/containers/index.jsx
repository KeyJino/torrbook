import React from "react";
import {inject, observer} from "mobx-react";
import "./styles.css"
import {Link, withRouter} from "react-router-dom";

@withRouter
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

	register() {
		this.props.authStore.register()
	}

	render() {
		return (
			<div>
				<div className="body"/>
				<div className="grad"/>
				<div className="header">
					<div>Torrent<span>Book</span></div>
				</div>

				<div className="login">

					<input type="text" placeholder="username" name="username" ref={this.username}/>

					<input type="password" placeholder="password" name="password" ref={this.password}/>

					<input type="button" onClick={this.signIn.bind(this)} value="Login"/>

					<input type="button" onClick={this.register.bind(this)} value="Register"/>

				</div>

			</div>
		);
	}
}