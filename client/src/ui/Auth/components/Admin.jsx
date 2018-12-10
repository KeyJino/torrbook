import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {inject} from "mobx-react";
import {observer} from "mobx-react/index";
import {withRouter} from "react-router-dom";
import AdminTable from "./AdminTable";


@withRouter
@inject('userStore', 'userService')
@observer
export default class Admin extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			key: 1,
			users: this.props.userStore.loadByRole(1)
		};

		this.handleSelect = this.handleSelect.bind(this);

	}

	handleSelect(key) {
		this.setState({key});
		this.setState({users: this.props.userStore.loadByRole(key)})
	}

	render() {

		return (
			<div>
				<h1>Все пользователи</h1>
				<Tabs activeKey={this.state.key}
					  onSelect={this.handleSelect}
					  id="controlled-tab-example">
					<Tab eventKey={1} title="Users">
						<AdminTable
							give="Книг прочитано"
							take="Книг взято"
						/>
					</Tab>
					<Tab eventKey={2} title="Moders">
						<AdminTable
							give="Всего книг добавлено"
							take="Книг на руках"
						/>
					</Tab>
					<Tab eventKey={3} title="Admins">
						<AdminTable
							give=""
							take=""
						/>
					</Tab>
				</Tabs>
			</div>

		);

	}
}