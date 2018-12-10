import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const REQUEST_URL = CONTEXT_URL + 'api/requests/';

/**
 * Store for working with Request.
 * Have some specified function for this act.
 */
export default class RequestStore {

	@observable
	requests = [];

	@observable
	request = null;

	/**
	 * Loading requests from database.
	 * Have segmentation for role: USER, MODER ADMIN.
	 * Each role have specific URL.
	 * @param id user.
	 */
	loadAll(id) {
		switch(JSON.parse(sessionStorage.getItem('user')).role.title) {
			case('USER'):
				fetch(REQUEST_URL + "user-" + id)
					.then(response => response.json())
					.then(action(requests => this.requests = requests))
					.catch(error => console.log(error.message));
				break;

			case('MODER'):
				fetch(REQUEST_URL + "moder-" + id)
					.then(response => response.json())
					.then(action(requests => this.requests = requests))
					.catch(error => console.log(error.message));
				break;

			default: break;
		}
	}

	/**
	 * Deleting request by id.
	 * @param identity of request.
	 */
	delete(identity) {
		fetch(REQUEST_URL + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.log(e.message))
	}

	/**
	 * Automatically updating [] with users.
	 * @param identity
	 */
	@action
	deleteHandler(identity) {
		const itemIndex = this.requests.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.requests.splice(itemIndex, 1);
		}
	}

	/**
	 * Approving request using id.
	 * @param identity of request.
	 */
	approve(identity) {
		const params = {
			method: 'POST',
			body: JSON.stringify(this.changeState(identity)),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(REQUEST_URL + 'approve-' + identity, params)
			.then(response => response.json())
			.then(action(request => this.request.push(request)))
			.catch(e => console.log(e))
	}

	/**
	 * Change state of request.
	 * @param identity of request.
	 * @returns {request} - request.
	 */
	changeState(identity) {
		let request = this.requests.find(request => request.id === identity);
		request.state = true;
		return request;
	}

}