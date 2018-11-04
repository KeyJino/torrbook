import React from "react";
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Login from "../Login";
import User from "../User";
import {inject} from "mobx-react";
import Header from "../Header";

@inject('authStore')
export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/user">User</Link></li>
                </ul>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <ProtectedRoute path="/user" user={this.props.authStore.user} component={User}/>
                </Switch>
            </div>
        )
    };
}

const ProtectedRoute = ({component: Component, user, ...rest}) => {

    const role = user == null ? null : user.authorities[0].authority;
    return <Route {...rest} render={(props) => (
        role === "ROLE_USER"
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
};