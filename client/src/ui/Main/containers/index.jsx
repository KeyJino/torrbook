import React from "react";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {inject, observer} from "mobx-react";

import Login from "../../Login/containers/index";
import Auth from "../../Auth/containers/index";
import Header from "../../Header/containers/index";
import Books from "../../Book/containers/index";
import Request from "../../Request/containers/index";
import Record from "../../Record/containers/index";
import Registration from "../../Registration/containers";
import CreateBook from "../../CreateBook/containers";

@withRouter
@inject('authStore', 'userService')
@observer
export default class Main extends React.Component {
	render() {


		const role = this.props.userService.checkRole;

		return (



			<div>
				<Header/>
				{
					this.props.authStore.user !== null &&
					sessionStorage.getItem('user') !== null
						? (<Switch>
							<Route path="/request" component={Request}/>
							<Route path="/user" component={Auth}/>
							<Route path='/books' component={Books}/>
							<Route path='/records' component={Record}/>
								{role('MODER') ? <Route path='/creating' component={CreateBook}/> : null}

							<Redirect from='*' to='/user'/>
						</Switch>)
						: (<Switch>
								<Route path="/registration" component={Registration}/>
								<Route path="/login" component={Login}/>
								<Redirect from='*' to='/login'/>
							</Switch>
						)
				}
			</div>
		)
	};
}