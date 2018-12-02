import React from 'react'

import './registration.css'
import {inject} from "mobx-react";
import {withRouter} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

@withRouter
@inject('userStore')
export default class Registration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			pass: '',
			confirm: '',
			role: '1'
		};

		this.username = React.createRef();
		this.first_password = React.createRef();
		this.second_password = React.createRef();
		this.email = React.createRef();

		this.onFirstPasswordChange = this.onFirstPasswordChange.bind(this);
		this.onSecondPasswordChange = this.onSecondPasswordChange.bind(this);
	}


	register() {
		this.props.userStore.create(
			this.username.current.value,
			this.second_password.current.value,
			this.role);
	}

	handleSubmit() {
		this.props.history.push('/login');
	};

	onFirstPasswordChange = e => {
		this.setState({pass: e.target.value});
	};

	onSecondPasswordChange = e => {
		console.log(this.role.current.value);
		this.setState({confirm: e.target.value});
	};

	onRoleChanged = e => {
		this.setState({role: e.target.value})
	};

	setNullPassword() {
		this.setState({confirm: ''});
	}


	render() {

		const text = {
			username: "C ограничением 2-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква",
			password: "Строчные и прописные латинские буквы, цифры. От 6 до 15 символов",
			confirm: "Пароль должен совпадать иначе это поле будет очищено",
			user: "Вы сможете выбрать книгу для чтения. За каждую прочтенную и возращенную книгу вы получите бонус",
			moder: "Вы можете добавлять свои книжки и давать их другим пользователям на время"
		};

		const tooltip = (text) => (
			<Tooltip id="tooltip">
				<strong>
					{text}
				</strong>
			</Tooltip>
		);


		return <div>

			<div className="body-reg"/>
			<div className="grad-reg"/>

			<form className="reg-form" onSubmit={
				this.state.pass === this.state.confirm ?
					this.handleSubmit.bind(this) : null}>

				<hr className="hr-reg"/>
				<h1 className="h1-reg">Create an account</h1>
				<hr className="hr-reg"/>


				<input type="radio"
					   value="1"
					   id="radioOne"
					   name="account"
					   onClick={this.onRoleChanged.bind(this)}
					   defaultChecked/>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.user)}>
					<label htmlFor="radioOne" className="radio label-reg">Reader</label>
				</OverlayTrigger>

				<input type="radio"
					   value="2"
					   id="radioTwo"
					   name="account"
					   onClick={this.onRoleChanged.bind(this)}/>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.moder)}>
					<label htmlFor="radioTwo" className="radio label-reg">Keeper</label>
				</OverlayTrigger>

				<hr className="hr-reg"/>

				<OverlayTrigger placement="left"
								overlay={tooltip(text.username)}>
					<input type="text"
						   placeholder="Username"
						   name="username"
						   pattern="^[a-zA-Z][a-zA-Z0-9-_]{4,13}$"
						   className="input-reg"
						   ref={() => this.username}
						   required/>
				</OverlayTrigger>

				<input type="email"
					   placeholder="Email"
					   name="username"
					   className="input-reg"
					   pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
					   ref={() => this.email}
					   required/>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.password)}>
					<input type="password"
						   placeholder="Password"
						   name="password"
						   className="input-reg"
						   pattern="(?=^.{5,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
						   ref={() => this.first_password}
						   onChange={this.onFirstPasswordChange}
						   value={this.state.pass}
						   required/>
				</OverlayTrigger>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.confirm)}>
					<input type="password"
						   placeholder="Confirm password"
						   name="confirmpassword"
						   className="input-reg"
						   pattern="(?=^.{5,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
						   ref={() => this.second_password}
						   onChange={this.onSecondPasswordChange}
						   onBlur={
							   this.state.pass !== this.state.confirm
								   ? this.setNullPassword.bind(this)
								   : null
						   }
						   value={this.state.confirm}
						   required/>
				</OverlayTrigger>

				<input type="submit"
					   value="Register"
					   name="register"
					   className="btn btn-block btn-primary"/>

			</form>
		</div>
	}
}