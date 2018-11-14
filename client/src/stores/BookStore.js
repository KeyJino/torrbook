import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const BOOK_URL = CONTEXT_URL + '/api/user/books';
const REQUEST_BOOK_URL = CONTEXT_URL + '/api/requests';

/**
 * Store for working with Book.
 * Sending some fetch request to server.
 */
export default class BookStore {

	@observable
	requests = [];

	@observable
	request = null;

	@observable
	books = [];

	@observable
	book = null;

	/**
	 * Download all books.
	 */
	loadAll() {
		fetch(BOOK_URL)
			.then(response => response.json())
			.then(action(books => this.books = books))
			.catch(error => console.error(error.message))
	}

	/**
	 * Creating Book. In DEMO version all data generating automatically.
	 */
	create() {
		const params = {
			method: 'POST',
			body: JSON.stringify(BookStore.generate()),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(BOOK_URL, params)
			.then(response => response.json())
			.then(action(book => this.books.push(book)))
			.catch(e => console.log(e))
	}

	/**
	 * Send fetch request to removing book.
	 * @param identity of Book
	 */
	delete(identity) {
		fetch(BOOK_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	/**
	 * Handler which deleting from [] book.
	 * @param identity of Book.
	 */
	@action
	deleteHandler(identity) {
		const itemIndex = this.books.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.books.splice(itemIndex, 1);
		}
	}

	/**
	 * Function changed request state on Book.
	 * @param identity of Book.
	 */
	changeRequest(identity) {
		const params = {
			method: 'POST',
			body: JSON.stringify(this.changeRequestState(identity)),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(BOOK_URL + '/change-request-' + identity, params)
			.then(response => response.json())
			.then(action(book => this.book.push(book)))
			.catch(e => console.log(e))
	}

	/**
	 * Request state handler.
	 * @param identity of Request.
	 * @returns {*} changed book request state.
	 */
	@action
	changeRequestState(identity) {
		let book = this.books.find(book => book.id === identity);
		book.request = true;
		return book;
	}

	/**
	 * Automatically generating Book in Demo Version.
	 * @returns Book object ->
	 * {{title: string, author: string, description: string, state: boolean, user: {id: number}}}
	 */
	static generate() {
		return {
			title: "book #" + Math.round(1000 * Math.random()),
			author: "author #" + Math.round(1000 * Math.random()),
			description: "description-",
			state: true,
			user: {
				id: 6
			}
		}
	}

	/**
	 * Request to take Book.
	 * @param id - user, who take want to take Book.
	 * @param book to given.
	 */
	requestBook(id, book) {
		const params = {
			method: 'POST',
			body: JSON.stringify({user: {id: id}, book: {id: book}, state: false}),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(REQUEST_BOOK_URL, params)
			.then(function (response) {
				if (response.status === 200)
					return response.json()
			})
			.catch(e => console.log(e))
	}

	/**
	 * Delete url to book.
	 */
	deselect() {
		this.book = null;
	}
}