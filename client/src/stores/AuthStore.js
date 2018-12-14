import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';

/**
 * Store for checking to signIn in application.
 */
export default class AuthStore {
	@observable
	user = JSON.parse(sessionStorage.getItem('user'));


	/**
	 * Get auth user from server.
	 */
	signIn(username, password) {
		const paramsUser = {
			username: username,
			password: password,
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
			.then((response) => {
				if (response.status === 200)
					return response.json();
			})
			.then(action(user => {
				if (!user.status) {
					sessionStorage.setItem('user', JSON.stringify(user));
					this.user = user;
				}
			}))
			.catch(e => alert('Incorrect login or password. Check it.'));
	}


	/**
	 * logOut from application.
	 */
	logOut() {
		fetch(CONTEXT_URL + 'logout', {method: 'POST'})
			.then(() => {
				this.user = null;
				sessionStorage.clear();
			})
			.catch(e => console.log(e));
	}
}