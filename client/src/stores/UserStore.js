import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const USER_URL = CONTEXT_URL + '/api/users/';
export default class UserStore {
	@observable
	users = [];

	@observable
	user = null;

	loadAll() {
		fetch(USER_URL)
			.then(response => response.json())
			.then(action(users => this.users = users))
			.catch(error => console.error(error.message))
	}

	create() {
		const params = {
			method: 'POST',
			body: JSON.stringify(UserStore.generate()),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(USER_URL, params)
			.then(response => response.json())
			.then(action(user => this.user.push(user)))
			.catch(e => console.log(e))
	}

	delete(identity) {
		fetch(USER_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	@action
	deleteHandler(identity) {
		const itemIndex = this.users.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.users.splice(itemIndex, 1);
		}
	}

	static generate() {
		return {
			title: "book #" + Math.round(1000 * Math.random()),
			author: "author #" + Math.round(1000 * Math.random()),
			description: "description-",
			user: {
				id: 6
			}
		}
	}

	// load(identity) {
	// 	fetch(BOOK_URL + "/" + identity, {method: 'GET'})
	// 		.then(response => response.json())
	// 		.then(action(company => this.company = company))
	// 		.catch(e => console.log(e));
	// }

	deselect() {
		this.book = null;
	}
}