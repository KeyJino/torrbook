import React from 'react'
import './index.css'
import {inject, observer} from "mobx-react/index";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


@inject('bookStore')
@observer
export default class CreateBook extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			author: '',
			user: JSON.parse(sessionStorage.getItem('user')).id,
			description: ''
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onAuthorChange = this.onAuthorChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
	}

	onTitleChange = e => {
		this.setState({title: e.target.value})
	};

	onAuthorChange = e => {
		this.setState({author: e.target.value})
	};

	onDescriptionChange = e => {
		this.setState({description: e.target.value})
	};

	handleSubmit() {
		alert("Ваша книга " + this.state.title + " успешно добавлена!");
		this.create();
		this.props.history.push('/books');
	};

	create() {
		this.props.bookStore.create(
			this.state.title,
			this.state.author,
			this.state.user,
			this.state.description
		)
	}

	render() {


		const text = {
			title: "Введите название книги...",
			author: "Введите автора книги...",
			description: "Краткое описание для пользователей о чём книга...",
		};

		const tooltip = (text) => (
			<Tooltip id="tooltip">
				<strong>
					{text}
				</strong>
			</Tooltip>
		);

		return (
			<div>
				<form className="create-form"
					  onSubmit={this.handleSubmit.bind(this)}>

					<h1 className="h1-reg">Create book</h1>

					<OverlayTrigger placement="left"
									overlay={tooltip(text.title)}>
						<input type="text"
							   placeholder="Title"
							   name="username"
							   className="create-input"
							   required
							   onChange={this.onTitleChange}
							   value={this.state.title}
							   pattern="^[а-яА-ЯёЁa-zA-Z0-9]{1,30}"/>
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
							   pattern="^[а-яА-ЯёЁa-zA-Z0-9]{1,30}"/>
					</OverlayTrigger>


					<div className="div-text-area">
						<OverlayTrigger placement="left"
										overlay={tooltip(text.description)}>
						<textarea className="text-area"
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