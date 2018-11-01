import React from "react";
import {inject, observer} from "mobx-react";


@inject('authStore')
@observer
export default class Login extends React.Component {

    signIn(){
        //this.props.authStore.changeRedirectToReferrer();
        this.props.authStore.signIn();
    }

    logOut(){
        this.props.authStore.logOut();
    }

    handleUsernameChange(event) {
        this.props.authStore.setUsername(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.authStore.setPassword(event.target.value);
    }

    render() {
        /*const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.props.authStore;*/

        return (
            <div>
                <form>
                    <input type="text" name="username" onChange={this.handleUsernameChange.bind(this)}/>
                    <br/>
                    <input type="password" name="password" onChange={this.handlePasswordChange.bind(this)}/>
                    <br/>
                </form>
                <button onClick={this.signIn.bind(this)}>Войти</button>
                <br/>
                <button onClick={this.logOut.bind(this)}>Выйти</button>
            </div>
        );
    }
}