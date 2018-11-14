import React from "react";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Login from "../Login";
import Auth from "../Auth";
import {inject, observer} from "mobx-react";
import Header from "../Header";
import Books from "../Book";
import Request from "../Request";
import Record from "../Record";

@withRouter
@inject('authStore')
@observer
export default class Main extends React.Component {
	render() {
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
						<Redirect from='*' to='/user'/>
					</Switch>)
					: (<Switch>
							<Route path="/login" component={Login}/>
							<Redirect from='*' to='/login'/>
						</Switch>
					)
				}
			</div>
		)
	};
}

// const ProtectedRoute = ({component: Component, user, ...rest}) => {
//
// 	const role = user == null ? null : user.authorities[0].authority;
// 	return <Route {...rest} render={(props) => (
// 		role === "USER"
// 			? <Component {...props} />
// 			: <Redirect to={{
// 				pathname: '/login',
// 				state: {from: props.location}
// 			}}/>
// 	)}/>
// };