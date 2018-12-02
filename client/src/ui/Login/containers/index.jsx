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


	render() {
		return (
			<div>
				<div className="body"/>
				<div className="grad"/>
				<div className="header">
					<div>Torrent<span>Book</span></div>
				</div>

				<div className="login">

					<input type="text" placeholder="Username" name="username" ref={this.username}
					className="input-log-text"/>

					<input type="password" placeholder="Password" name="password" ref={this.password}
					className="input-log-pass"/>

					<input type="button" onClick={this.signIn.bind(this)} value="Login"
					className="input-log-btn"/>

					<Link to="/registration"><input type="button" value="Register"
					className="input-log-btn"/></Link>


				</div>

			</div>
		);
	}
}