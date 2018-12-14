import React from 'react'
import {inject, observer} from 'mobx-react'
import {Table} from "react-bootstrap";
import './index.css'

import Moder from '../components/Moder'
import User from '../components/User'

/**
 * Displaying records to current user.
 */
@inject('recordStore', 'userService')
@observer
export default class Record extends React.Component {

	/**
	 * When component downloading records to current user.
	 */
	componentDidMount() {
		this.props.recordStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id);
	}

	render() {

		const role = this.props.userService.checkRole;

		return (
			<div>
				<h1>Текущие сделки</h1>

				<Table>
					<thead>
					<tr>
						<th>Состояние</th>
						<th/>
						<th>Название книги</th>
						<th>Предоставил</th>
					</tr>
					</thead>
					{
						role('MODER') ? (<Moder/>) : (<User/>)
					}
				</Table>
			</div>
		)
	};
}