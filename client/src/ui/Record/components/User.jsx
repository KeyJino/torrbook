import React from 'react';
import {inject, observer} from "mobx-react/index";

/**
 * Moder component to display here header.
 */
@inject('recordStore')
@observer
export default class User extends React.Component {

	replace(id) {
		this.props.recordStore.replaceBook(id);
	}

	render() {
		return (
			<tbody>
			{
				this.props.recordStore.records.map(({id: record_id, description, book}) => (
						<tr key={record_id}>
							<td>
								<input type="button"
									   value="Вернуть"
									   className="rec-replace-btn"
									   onClick={() => this.replace(record_id)}/>
							</td>
							<td/>
							<td>{book.title}</td>
							<td>{book.user.username}</td>
						</tr>
					)
				)
			}
			</tbody>
		)
	}
}