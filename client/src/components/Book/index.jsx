import React from "react";
import {inject, observer} from 'mobx-react';

@inject('bookStore')
@observer
export default class Books extends React.Component {
	componentDidMount() {
		this.props.bookStore.loadAll();
	}

	delete(id) {
		this.props.bookStore.delete(id);
	}

	request(id) {
		this.props.bookStore.requestBook(JSON.parse(sessionStorage.getItem('user')).id, id);
	}

	// componentDidMount() {
	// 	// const {match: {params: {id}}} = this.props;
	// 	console.log(id);
	// 	// this.props.bookStore.load(id);
	// }

	componentWillUnmount() {
		this.props.bookStore.deselect();
	}

	render() {
		// let {authorities: [{authority}]} = null;
		const {props: {bookStore: {books}}} = this;
		return (
			<div>
				{books.map(({id, title, state}) => (
					<div key={id}>
						{state === true
							? <div>
								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'ADMIN'
									? (<button onClick={() => this.delete(id)}>X</button>)
									: null
								}
								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'USER'
									? (<button onClick={() => this.request(id)}>+</button>)
									: null
								}

								{title}
							</div>
							: null}
					</div>
				))}

				<button onClick={() =>
					this.props.bookStore.create()}>Добавить книгу
				</button>
			</div>);
	}
}
