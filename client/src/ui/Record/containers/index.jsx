import React from 'react'
import {inject, observer} from 'mobx-react'
import {Button, Table} from "react-bootstrap";



@inject('recordStore')
@observer
export default class Record extends React.Component{

	componentDidMount() {
		this.props.recordStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id);
	}

	replace(id) {
		this.props.recordStore.replaceBook(id);
	}

	render() {
		const {props: {recordStore: {records}}} = this;
		return (
			<Table>
				<thead>
				<tr>
					<th>Состояние</th>
					<th>Статус</th>
					<th>Название книги</th>
					<th>Предоставил</th>
				</tr>
				</thead>

				{
					(JSON.parse(sessionStorage.getItem('user')))
						.role.title === 'MODER'
						? (
							<tbody>
							{
								records.map(({id: record_id, description, book, user}) => (
										<tr key={record_id}>
											<td>
												Здесь будут модерские методы
											</td>

											<td>
												Тратата
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
				}

				{
					(JSON.parse(sessionStorage.getItem('user')))
						.role.title === 'USER'
						? (
							<tbody>
							{
								records.map(({id: record_id, description, book, user}) => (
										<tr key={record_id}>
											<td>
												<Button bsSize="small" bsStyle="warning"
														onClick={() => this.replace(record_id)}>Вернуть</Button>
											</td>
											<td>
												{description}
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
				}
			</Table>
		)
	};
}