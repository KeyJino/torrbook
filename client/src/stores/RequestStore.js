import {action, observable} from "mobx";
import BookStore from "./BookStore";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const REQUEST_URL = CONTEXT_URL + '/api/requests/';
export default class RequestStore {

	@observable
	requests = [];

	@observable
	request = null;

	loadAll() {
		fetch(REQUEST_URL)
			.then(response => response.json())
			.then(action(requests => this.requests = requests))
			.catch(error => console.error(error.message))
	}

	delete(identity) {
		fetch(REQUEST_URL + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	@action
	deleteHandler(identity) {
		const itemIndex = this.requests.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.requests.splice(itemIndex, 1);
		}
	}

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

	changeState(identity) {
		let request = this.requests.find(request => request.id === identity);
		request.state = true;
		return request;
	}


}