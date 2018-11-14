import React from "react";
import {inject, observer} from 'mobx-react';
import {Button, Table} from "react-bootstrap";

/**
 * Book component. Component content function to working with book.
 */
@inject('bookStore')
@observer
export default class Books extends React.Component {

	/**
	 * What doing when component load.
	 */
	componentDidMount() {
		this.props.bookStore.loadAll();
	}

	/**
	 * Delete request by id.
	 */
	delete(id) {
		this.props.bookStore.delete(id);
	}

	/**
	 * Adding request to Book.
	 * @param id
	 */
	addRequest(id) {
		this.props.bookStore.requestBook(JSON.parse(sessionStorage.getItem('user')).id, id);
	}

	/**
	 * Deprecated
	 */
	check(id) {
		this.props.bookStore.checkRequest(id);
		return this.props.bookStore.request === null;
	}

	/**
	 * Changed book request state.
	 * @param id of book.
	 */
	changeBookRequest(id) {
		this.props.bookStore.changeRequest(id);
	}

	/**
	 * What doing when component is closing.
	 */
	componentWillUnmount() {
		this.props.bookStore.deselect();
	}

	render() {
		const {props: {bookStore: {books}}} = this;
		return (
			<Table responsive hover>
				<thead>
				<tr>
					<th>Действие</th>
					<th>Название</th>
					<th>Состояние</th>


				</tr>
				</thead>
				{books.map(({id: book_id, title, state, request}) => (
					<tbody key={book_id}>
					{
						state === true
							?
							<tr>

								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'ADMIN'
									? (
										<td>
											<Button bsSize="xsmall" bsStyle="danger"
													onClick={() => this.delete(book_id)}>Удалить
											</Button>
										</td>)
									: null
								}
								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'USER'
									? (
										<td>
											<Button bsSize="xsmall" bsStyle="primary"
													onClick={() => {
														this.addRequest(book_id);
														this.changeBookRequest(book_id)
													}}
													disabled={request}>Запросить

											</Button>
										</td>
									)
									: null
								}

								<td>
									{title}
								</td>
								<td>
									{state && !request? "Можно взять" : request ? "В запросах" : "На руках"}
								</td>

							</tr>
							: null}
					</tbody>

				))}

				{(JSON.parse(sessionStorage.getItem('user')))
					.role.title === 'ADMIN'
					?
					<Button bsSize="xsmall" bsStyle="success" onClick={() =>
						this.props.bookStore.create()}>Добавить книгу
					</Button>
					: null
				}
			</Table>
		);
	}
}
