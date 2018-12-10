import React from 'react'
import {inject, observer} from 'mobx-react'
import {Table} from "react-bootstrap";
import './index.css'


@inject('recordStore')
@observer
export default class Record extends React.Component {

	componentDidMount() {
		this.props.recordStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id);
	}

	replace(id) {
		this.props.recordStore.replaceBook(id);
	}

	render() {
		const {props: {recordStore: {records}}} = this;
		return (
			<div>
				<h1>Текущие сделки</h1>

				<Table>
					<thead>
					<tr>
						<th>Состояние</th>
						<th>Описание</th>
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
													Номер сделки: {record_id}
												</td>

												<td>
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
													<input type="button"
														   value="Вернуть"
														   className="rec-replace-btn"
														   onClick={() => this.replace(record_id)}/>
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
			</div>
		)
	};
}