import React from "react";
import {inject, observer} from 'mobx-react';
import {Button, Table} from "react-bootstrap";

@inject('requestStore', 'userService')
@observer
export default class Request extends React.Component {

	componentDidMount() {
		this.props.requestStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id);
	}

	delete(id) {
		this.props.requestStore.delete(id);
	}

	approve(id) {
		this.props.requestStore.approve(id);
	}

	render() {
		const {props: {requestStore: {requests}}} = this;

		const role = this.props.userService.checkRole;

		return (
			<Table>
				<thead>
				<tr>
					<th>Состояние</th>
					<th>Статус</th>
					<th>Название книги</th>
					<th>Пользователь</th>
				</tr>
				</thead>

				{
					(role('MODER')
						? (
							<tbody>
							{
								requests.map(({id: request_id, state, book, user}) => (
										<tr key={request_id}>
											<td>
												<Button bsSize="small" bsStyle="danger"
														onClick={() => this.delete(request_id)}>Удалить</Button>
												<Button bsSize="small" bsStyle="success"
														onClick={() => this.approve(request_id)}>Одобрить</Button>
											</td>

											<td>
												{state ? "Запрос выполнен" : "На рассмотрении"}
											</td>
											<td>
												{book.title}
											</td>
											<td>
												{user.username}
											</td>
										</tr>
									)
								)
							}
							</tbody>
						)
						: null
					)
				}

				{
					(role('USER')
						? (
							<tbody>
							{
								requests.map(({id: request_id, state, book, user}) => (
										<tr key={request_id}>
											<td>
												<Button bsSize="small" bsStyle="danger"
														onClick={() => this.delete(request_id)}>Удалить</Button>

											</td>
											<td>
												{state ? "Запрос выполнен" : "На рассмотрении"}
											</td>
											<td>
												{book.title}
											</td>
											<td>
												{book.user.username}
											</td>
										</tr>
									)
								)
							}
							</tbody>
						)
						: null
					)
				}
			</Table>
		)
	}
}