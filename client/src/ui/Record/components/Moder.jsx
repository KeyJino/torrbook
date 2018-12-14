import React from 'react';
import {inject, observer} from "mobx-react/index";

/**
 * Moder component to display here header.
 */
@inject('recordStore')
@observer
export default class Moder extends React.Component {

	render() {
		return (
			<tbody>
			{
				this.props.recordStore.records.map(({id: record_id, description, book, user}) => (
						<tr key={record_id}>
							<td>Номер сделки: {record_id}</td>
							<td/>
							<td>{book.title}</td>
							<td>{user.username}</td>
						</tr>
					)
				)
			}
			</tbody>
		)
	}
}