import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import {Button, Nav, Navbar, NavItem} from "react-bootstrap";

@inject("authStore")
@observer
export default class Header extends React.Component {

	logOut() {
		this.props.authStore.logOut();
	}

	render() {
		return (

			<div>
				{
					this.props.authStore.user !== null &&
					sessionStorage.getItem('user') !== null
						?

						<Navbar>
							<Nav>
								<Navbar.Brand>
									<Link to="/user"> Главная </Link>
								</Navbar.Brand>
								<Navbar.Brand>
									<Link to="/books"> Книги </Link>
								</Navbar.Brand>
								<Navbar.Brand>
									<Link to="/request"> Запросы </Link>
								</Navbar.Brand>
								<Navbar.Brand>
									<Link to="/records"> Записи </Link>
								</Navbar.Brand>
							</Nav>
							<Nav>
								<NavItem>
									<Button bsSize="small"
													 onClick={this.logOut.bind(this)}>Выйти</Button>
								</NavItem>
							</Nav>

						</Navbar>

						: null
				}
			</div>
		);
	}
}