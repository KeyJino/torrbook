import React from 'react'

import './index.css'
import {inject} from "mobx-react";
import {withRouter} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

@withRouter
@inject('userStore')
export default class Registration extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			isPresent: undefined,
			email: '',
			pass: '',
			confirm: '',
			role: '1'
		};

		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
		this.onPassChange = this.onPassChange.bind(this);
		this.onConfirmChange = this.onConfirmChange.bind(this);
		this.check = this.check.bind(this);
	}

	register() {
		this.props.userStore.create(
			this.state.username,
			this.state.confirm,
			this.state.role);
	}

	handleSubmit() {
		alert("Ваш аккаунт " + this.state.username + " успешно создан!");
		this.register();
		this.props.history.push('/login');
	};

	onUsernameChange = e => {
		this.check();
		this.setState({username: e.target.value})
	};

	onEmailChange = e => {
		this.setState({email: e.target.value})
	};

	onPassChange = e => {
		this.setState({pass: e.target.value});
	};

	onConfirmChange = e => {
		this.setState({confirm: e.target.value});
	};

	onRoleChanged = e => {
		this.setState({role: e.target.value})
	};

	setNullUsername() {
		this.setState({username: ''});
	}

	setNullPresent() {
		this.setState({isPresent: ''});
	}

	setNullPassword() {
		this.setState({confirm: ''});
	}

	check() {
		this.setState({isPresent: this.props.userStore.username},
			() => {
				this.props.userStore.check(this.state.username);

				if (this.state.isPresent === this.state.username) {
					this.setNullUsername();
					this.setNullPresent();
					this.props.userStore.check('');
				}
			});
	};


	render() {

		const text = {
			username: "C ограничением 5-13 символов, которыми могут быть буквы и цифры, первый символ обязательно буква",
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

			<form className="reg-form"
				  onSubmit={
					  this.state.pass === this.state.confirm
						  ? this.handleSubmit.bind(this)
						  : null}>

				<hr className="hr-reg"/>
				<h1 className="h1-reg">Create an account</h1>
				<hr className="hr-reg"/>


				<input type="radio"
					   value="1"
					   id="radioOne"
					   name="account"
					   defaultChecked
					   onClick={this.onRoleChanged.bind(this)}/>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.user)}>
					<label htmlFor="radioOne" className="radio label-reg">Reader</label>
				</OverlayTrigger>

				<input type="radio"
					   id="radioTwo"
					   name="account"
					   value="2"
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
						   className="input-reg"
						   required
						   onChange={this.onUsernameChange}
						   onBlur={this.check}
						   value={this.state.username}
						   pattern="^[a-zA-Z][a-zA-Z0-9-_]{4,13}$"/>
				</OverlayTrigger>


				<input type="email"
					   placeholder="Email"
					   name="email"
					   className="input-reg"
					   required
					   onChange={this.onEmailChange}
					   pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"/>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.password)}>
					<input type="password"
						   placeholder="Password"
						   name="password"
						   className="input-reg"
						   required
						   value={this.state.pass}
						   onChange={this.onPassChange}
						   pattern="(?=^.{5,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"/>
				</OverlayTrigger>


				<OverlayTrigger placement="left"
								overlay={tooltip(text.confirm)}>
					<input type="password"
						   placeholder="Confirm password"
						   name="confirm"
						   className="input-reg"
						   onBlur={
							   this.state.pass !== this.state.confirm
								   ? this.setNullPassword.bind(this)
								   : null
						   }
						   required
						   onChange={this.onConfirmChange}
						   value={this.state.confirm}
						   pattern="(?=^.{5,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"/>
				</OverlayTrigger>


				<input type="submit"
					   name="register"
					   className="btn-reg btn-block btn-primary"
					   value="Register"/>
			</form>
		</div>
	}
}