import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';

export default class AuthStore {
    @observable
    user = null;
    @observable
    redirectToReferrer = false;

    username = '';
    password = '';

    /**
     * Set new username
     */
    setUsername(username){
        this.username = username;
    }

    /**
     * Set new password
     */
    setPassword(password){
        this.password = password;
    }

    @action
    changeRedirectToReferrer() {
        this.redirectToReferrer = !this.redirectToReferrer;
    }

    /**
     * Get auth user from server
     */
    signIn() {
        const paramsUser = {
            username: this.username,
            password: this.password,
        };
        let formData = [];
        for (let index in paramsUser) {
            let encodedKey = encodeURIComponent(index);
            let encodedValue = encodeURIComponent(paramsUser[index]);
            formData.push(encodedKey + '=' + encodedValue);
        }
        formData = formData.join('&');
        const params = {
            method: 'POST',
            body: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        };
        fetch(CONTEXT_URL + 'login', params)
            .then(response => response.json())
            .then(action(user => {
                this.user = user;
            }))
            .catch(e => {
                console.log(e);
            });
    }


    /**
     * logOut
     */
    logOut(){
        fetch(CONTEXT_URL + 'logout', {method: 'POST'})
            .then(() => this.user = null)
            .catch(e => console.log(e));
    }
}