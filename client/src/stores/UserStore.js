import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const USER_URL = CONTEXT_URL + '/api/users/';

/**
 * Store for working with user in application.
 */
export default class UserStore {
	@observable
	users = [];

	@observable
	user = null;

	/**
	 * Loading all users from database.
	 * Fetch request.
	 */
	loadAll() {
		fetch(USER_URL)
			.then(response => response.json())
			.then(action(users => this.users = users))
			.catch(error => console.error(error.message))
	}

	/**
	 * Fetch POST request to database create user.
	 * In DEMO hasn't might to create new User.
	 * Only default.
	 */
	create() {
		const params = {
			method: 'POST',
			body: 'DEMO',
			headers: {'Content-Type': 'application/json'}
		};
		fetch(USER_URL, params)
			.then(response => response.json())
			.then(action(user => this.user.push(user)))
			.catch(e => console.log(e))
	}

	/**
	 * Fetch GET request to delete user.
	 * @param identity this User.
	 */
	delete(identity) {
		fetch(USER_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	/**
	 * Handler to automatically update [] on delete.
	 * @param identity of the User.
	 */
	@action
	deleteHandler(identity) {
		const itemIndex = this.users.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.users.splice(itemIndex, 1);
		}
	}

	/**
	 * Clearing user.
	 */
	deselect() {
		this.user = null;
	}
}