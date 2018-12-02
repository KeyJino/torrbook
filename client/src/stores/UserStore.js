import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const USER_URL = CONTEXT_URL + '/api/users';

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
	 * In DEMO hasn't might to create new UserButton.
	 * Only default.
	 */
	create(username, password, role) {
		console.log(username, password, role);
		const params = {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				about: 'testing',
				role: {
					id: role
				},
				password: password
			}),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(USER_URL + "/creating", params)
			.then(response => response.json())
			.then(action(user => this.user.push(user)))
			.catch(e => console.log(e))
	}

	/**
	 * Fetch GET request to delete user.
	 * @param identity this UserButton.
	 */
	delete(identity) {
		fetch(USER_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	/**
	 * Handler to automatically update [] on delete.
	 * @param identity of the UserButton.
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