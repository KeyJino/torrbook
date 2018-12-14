import React from 'react';
import {inject, observer} from "mobx-react/index";

/**
 * Moder component to display here header.
 */
@inject('requestStore')
@observer
export default class User extends React.Component {

	delete(id) {
		this.props.requestStore.delete(id);
	}

	render() {
		return (
			<tbody>{
				this.props.requestStore.requests.map(({id: request_id, state, book, user}) => (
						<tr key={request_id}>
							<td>
								<input type="button"
									   value="Удалить"
									   className="request-req-inp-del"
									   onClick={() => this.delete(request_id)}/>

							</td>
							<td>{state ? "Запрос выполнен" : "На рассмотрении"}</td>
							<td>{book.title}</td>
							<td>{book.user.username}</td>
						</tr>
					)
				)
			}</tbody>
		)
	}
}