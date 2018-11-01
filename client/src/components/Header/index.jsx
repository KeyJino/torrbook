import React from "react";
import {inject, observer} from "mobx-react";

@inject("authStore")
@observer
export default class Header extends React.Component{

    logOut(){
        this.props.authStore.logOut();
    }

    render(){
        const {user} = this.props.authStore;
        return(
            <div>
                {user != null ? ("Добрый день, " + user.username) : "Авторизуйтесь"}
                {user && <button onClick={this.logOut.bind(this)}>Выйти</button>}
            </div>
        );
    }
}