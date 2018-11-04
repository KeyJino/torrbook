import React from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

@inject('authStore')
@observer
export default class User extends React.Component {
    render() {
        const {user} = this.props.authStore;
        return user == null ? <Redirect to="/"/> : (
            <div>
                <h1>User page</h1>
            </div>
        );
    }
}