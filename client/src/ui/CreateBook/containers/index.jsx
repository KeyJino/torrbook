import React from 'react'
import './index.css'
import {inject, observer} from "mobx-react/index";
import {Button, Label} from "react-bootstrap";


@inject('bookStore')
@observer
export default class CreateBook extends React.Component {
	constructor(props) {
		super(props);
		this.bookTitle = React.createRef();
		this.author = React.createRef();
		this.user = JSON.parse(sessionStorage.getItem('user')).id;
		this.description = React.createRef();
	}

	create() {
		this.props.bookStore.create(
			this.bookTitle.current.value,
			this.author.current.value,
			this.user,
			this.description.current.value
		)
	}

	render() {
		return (
			<div>
				<ul>
					<li>
						<label>Название</label>
						<input type="text" class="masked" placeholder="..." ref={this.bookTitle}/>
					</li>

					<li>
						<label>Автор</label>
						<input type="text" class="masked" placeholder="..." ref={this.author}/>
					</li>

					<li>
						<label>Описание</label>
						<textarea class="textarea" ref={this.description}/>
					</li>

					<li>
						<Button bsSize="xsmall" bsStyle="success" onClick={
							this.create.bind(this)}> Добавить книгу
						</Button>
					</li>
				</ul>
			</div>
		)
	}
}