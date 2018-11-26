import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from "react-bootstrap";


@inject('authStore', 'userService')
@observer
export default class Header extends React.Component {

	logOut() {
		this.props.authStore.logOut();
	}

	render() {

		const role = this.props.userService.checkRole;

		return (
			<div>
				{
					this.props.authStore.user !== null &&
					sessionStorage.getItem('user') !== null
						?
						<Navbar inverse collapseOnSelect fluid>
							<Navbar.Header>
								<Navbar.Brand eventKey={1}>
									<Link to="/user"> Torrent Book </Link>
								</Navbar.Brand>
								<Navbar.Toggle/>
							</Navbar.Header>
							<Navbar.Collapse>
								<Nav>
									<Navbar.Brand eventKey={2}>
										<Link to="/books"> Книги </Link>
									</Navbar.Brand>
									<Navbar.Brand eventKey={3}>
										<Link to="/request"> Запросы </Link>
									</Navbar.Brand>
									<Navbar.Brand eventKey={4}>
										<Link to="/records"> Записи </Link>
									</Navbar.Brand>

									{role('MODER') ?
										<Navbar.Brand eventKey={4}>
											<Link to="/creating"> Добавить книгу </Link>
										</Navbar.Brand>
										: null
									}

								</Nav>
								<Nav pullRight>
									<NavItem eventKey={6} onClick={this.logOut.bind(this)}>
										Выйти
									</NavItem>
								</Nav>
							</Navbar.Collapse>
						</Navbar>

						: null
				}
			</div>
		);
	}
}