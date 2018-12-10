import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const RECORD_URL = CONTEXT_URL + 'api/records/';

/**
 * Store for working with Records.
 */
export default class RecordStore {

	@observable
	records = [];

	@observable
	record = null;

	/**
	 * Loading all records using some roles('USER', 'MODER', 'ADMIN').
	 * @param id of UserButton.
	 */
	loadAll(id) {
		switch(JSON.parse(sessionStorage.getItem('user')).role.title) {
			case('USER'):
				fetch(RECORD_URL + "user-" + id)
					.then(response => response.json())
					.then(action(records => this.records = records))
					.catch(error => console.error(error.message));
				break;

			case('MODER'):
				fetch(RECORD_URL)
					.then(response => response.json())
					.then(action(records => this.records = records))
					.catch(error => console.error(error.message));
				break;

			case('ADMIN'):
				fetch(RECORD_URL)
					.then(response => response.json())
					.then(action(records => this.records = records))
					.catch(error => console.error(error.message));
				break;

			default: break;
		}
	}

	/**
	 * Switch Book status.
	 * @param identity of Book.
	 */
	replaceBook(identity) {
		fetch(RECORD_URL + identity, {method: 'DELETE'})
			.then(() => this.replaceHandler(identity))
			.catch(e => console.error(e.message))
	}

	/**
	 * Handler for switching status book.
	 * @param identity
	 */
	@action
	replaceHandler(identity) {
		const itemIndex = this.records.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.records.splice(itemIndex, 1);
		}
	}
}