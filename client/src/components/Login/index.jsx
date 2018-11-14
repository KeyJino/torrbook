import React from "react";
import {inject, observer} from "mobx-react";
import {Button, FormControl, FormGroup} from "react-bootstrap";


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
				<form>
					<FormGroup>
						<FormControl
							type="text"
							placeholder="username"
							inputRef={this.username}/>
						<FormControl
							type="password"
							placeholder="password"
							inputRef={this.password}/>
					</FormGroup>
					<br/>
				</form>
				<Button onClick={this.signIn.bind(this)}>Войти</Button>
			</div>
		);
	}
}