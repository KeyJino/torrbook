import React from "react";
import {inject, observer} from 'mobx-react';
import {Table} from "react-bootstrap";
import './index.css'

import User from '../components/User';
import Moder from "../components/Moder";

/**
 * Request component to link 'request'.
 */
@inject('requestStore', 'userService')
@observer
export default class Request extends React.Component {

	/**
	 * When component downloading - loading to current user.
	 */
	componentDidMount() {
		this.props.requestStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id);
	}

	componentWillUnmount() {
		this.props.requestStore.deselect();
	}

	render() {

		const role = this.props.userService.checkRole;

		return (
			<Table>
				<thead>
				<tr>
					<th>Действие</th>
					<th>Статус</th>
					<th>Название книги</th>
					<th>Пользователь</th>
					<th>Рейтинг</th>
				</tr>
				</thead>
				{
					(role('MODER') ? <Moder/> : <User/>)
				}
			</Table>
		)
	}
}