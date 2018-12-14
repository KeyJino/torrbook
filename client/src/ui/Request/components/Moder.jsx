import React from 'react';
import {inject, observer} from "mobx-react/index";

/**
 * Moder component to display here header.
 */
@inject('requestStore')
@observer
export default class Moder extends React.Component {

	/**
	 * Deleting request.
	 * @param id is current request.
	 */
	delete(id) {
		this.props.requestStore.delete(id);
	}

	/**
	 * Approving request and take give some user.
	 * @param id - current request.
	 */
	approve(id) {
		this.props.requestStore.approve(id);
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

								<input type="button"
									   value="Одобрить"
									   className="request-req-inp-app"
									   onClick={() => this.approve(request_id)}
									   disabled={!book.state}/>
							</td>

							<td>{state ? "Запрос выполнен" : "На рассмотрении"}</td>
							<td>{book.title}</td>
							<td>{user.username}</td>
							<td>{user.bookGiven - user.bookTaken}</td>
						</tr>
					)
				)}
			</tbody>
		)
	}
}