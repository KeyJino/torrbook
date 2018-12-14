import React from 'react'
import './index.css'
import {inject, observer} from "mobx-react/index";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

/**
 * Component to creating Book. Contain form with input for this.
 */
@inject('bookStore')
@observer
export default class CreateBook extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			author: '',
			description: ''
		};
		this.user = JSON.parse(sessionStorage.getItem('user')).id;
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onAuthorChange = this.onAuthorChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
	}

	/**
	 * Handler to check title, when it change.
	 * @param e - current event this value.
	 */
	onTitleChange = e => {
		this.setState({title: e.target.value})
	};

	/**
	 * Handler to check author, when it change.
	 * @param e - current event this value.
	 */
	onAuthorChange = e => {
		this.setState({author: e.target.value})
	};

	/**
	 * Handler to check description, when it change.
	 * @param e - current event this value.
	 */
	onDescriptionChange = e => {
		this.setState({description: e.target.value})
	};

	/**
	 * Some handle-alert to notify MODER about creating book.
	 */
	handleSubmit() {
		this.props.bookStore.createBook(
			this.state.title,
			this.state.author,
			this.user,
			this.state.description
		);
		this.props.history.push('/#/books');
	};

	render() {
		const text = {
			title: "Введите название книги...",
			author: "Введите автора книги...",
			description: "Краткое описание для пользователей о чём книга...",
		};

		const tooltip = (text) => (
			<Tooltip id="tooltip">
				<strong>{text}</strong>
			</Tooltip>
		);

		return (
			<div>
				<form className="create-form"
					  onSubmit={this.handleSubmit.bind(this)}>

					<h1 className="create-h1">Create book</h1>

					<OverlayTrigger placement="left"
									overlay={tooltip(text.title)}>
						<input type="text"
							   placeholder="Title"
							   name="username"
							   className="create-input"
							   required
							   onChange={this.onTitleChange}
							   value={this.state.title}
							   pattern="^[а-яА-ЯёЁa-zA-Z0-9_ ]{1,35}"/>
					</OverlayTrigger>


					<OverlayTrigger placement="left"
									overlay={tooltip(text.author)}>
						<input type="text"
							   placeholder="Author"
							   name="author"
							   className="create-input"
							   required
							   onChange={this.onAuthorChange}
							   value={this.state.author}
							   pattern="^[а-яА-ЯёЁa-zA-Z0-9_ ]{1,30}"/>
					</OverlayTrigger>


					<div className="div-text-area">
						<OverlayTrigger placement="left"
										overlay={tooltip(text.description)}>
						<textarea className="text-area"
								  maxLength={200}
								  onChange={this.onDescriptionChange}
								  value={this.state.description}
								  required/>
						</OverlayTrigger>
					</div>

					<input type="submit"
						   value="add book"
						   className="btn-reg btn-block btn-primary"/>
				</form>
			</div>
		)
	}
}