import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const USER_URL = CONTEXT_URL + 'api/users';

/**
 * Store for working with user in application.
 */
export default class UserStore {
	@observable
	users = [];

	@observable
	user = null;

	@observable
	username = undefined;

	/**
	 * Loading all users from database.
	 * Fetch request.
	 */
	loadAll() {
		fetch(USER_URL)
			.then(response => response.json())
			.then(action(users => this.users = users))
			.catch(error => console.log(error.message))
	}

	/**
	 * Downloading list users by role.
	 * @param role_id - role from database.
	 */
	loadByRole(role_id) {
		fetch(USER_URL + "/role-" + role_id)
			.then(response => response.json())
			.then(action(users => this.users = users))
			.catch(error => console.log(error.message))
	}

	/**
	 * Fetch POST request to database createBook user.
	 * In DEMO hasn't might to createBook new UserButton.
	 * Only default.
	 */
	create(username, password, role) {
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
			.catch(e => console.log(e.message))
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
	 * Check some user.
	 * @param username - current user.
	 */
	check(username) {
		fetch(USER_URL + "/" + username)
			.then(response => response.json())
			.then(action(response => this.username = response.username))
			.catch(e => console.log(e));
	}

	/**
	 * Banned / un-banned user by ADMIN.
	 * @param user_id - current user.
	 */
	ban(user_id) {
		fetch(USER_URL + "/ban-" + user_id)
			.then(response => response.json())
			.then(() => this.onBanHandler(user_id))
			.catch(e => console.log(e))
	}

	/**
	 * Edit current user ban status.
	 * @param user_id - current user.
	 */
	@action
	onBanHandler(user_id) {
		const itemIndex = this.users.findIndex(({id}) => id === user_id);
		this.users[itemIndex].status = !this.users[itemIndex].status;
	}

	/**
	 * Clearing user.
	 */
	deselect() {
		this.user = null;
	}
}