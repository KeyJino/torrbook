import React from 'react'
import {Table} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react/index";

@withRouter
@inject('userStore', 'userService')
@observer
export default class AdminTable extends React.Component {

	constructor(props) {
		super(props);
		this.onStatusBanChange = this.onStatusBanChange.bind(this);
	}

	onStatusBanChange(user_id) {
		this.props.userStore.ban(user_id);
	}

	render() {

		const {props: {userStore: {users}}} = this;


		return (

			<Table>
				<thead>
				<tr>
					<th>Имя</th>
					<th>{this.props.give}</th>
					<th>{this.props.take}</th>
					<th>Бан</th>
				</tr>
				</thead>

				<tbody>
				{
					users.map(({id: user_id, username, bookGiven, bookTaken, role, status}) => (
							<tr key={user_id}>
								<td>
									{username}
								</td>

								<td>
									{bookGiven}
								</td>

								<td>
									{bookTaken}
								</td>

								<td>
									<input type="button"
										   onClick={() => {
											   this.onStatusBanChange(user_id)
										   }}
										   value={status.toString()}
										   className="input-log-btn"/>
								</td>
							</tr>
						)
					)
				}
				</tbody>

			</Table>

		)

	}

}