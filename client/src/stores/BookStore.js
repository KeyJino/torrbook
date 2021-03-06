import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const BOOK_URL = CONTEXT_URL + 'api/user/books';
const REQUEST_BOOK_URL = CONTEXT_URL + 'api/requests';

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
			.catch(error => console.log(error.message))
	}

	/**
	 * Downloading list of books by user_id.
	 * @param user_id
	 */
	loadById(user_id) {
		fetch(BOOK_URL + '/load' + user_id)
			.then(response => response.json())
			.then(action(books => this.books = books))
			.catch(error => console.log(error.message))
	}


	/**
	 * Searching all Books by containing symbols.
	 * @param title - some symbols from Book title.
	 */
	findBookByTitle(title) {
		title = title.replace(/\s/g, '_');

		fetch(BOOK_URL + "/" + "&" + title)
			.then(response => response.json())
			.then(action(books => this.books = books))
			.catch(error => console.log(error.message))
	}

	/**
	 * Creating Book. In DEMO version all data generating automatically.
	 */
	createBook(title, author, user, description) {
		const params = {
			method: 'POST',
			body: JSON.stringify(BookStore.generate(title, author, user, description)),
			headers: {'Content-Type': 'application/json'}
		};
		fetch(BOOK_URL + "/book-creating", params)
			.then(response => response.json())
			.then(action((book) => {
				this.books.push(book);
				alert("Ваша книга " + book.title + " успешно добавлена!");
			}))
			.catch(e => console.log(e))
	}

	/**
	 * Send fetch request to removing book.
	 * @param identity of Book
	 */
	delete(identity) {
		fetch(BOOK_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.log(e.message))
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
	 * {{title: string,
	 * author: string,
	 * description: string,
	 * state: boolean,
	 * user: {id: number},
	 * image: {id: number}}
	 */
	static generate(title, author, user, description) {
		return {
			title: title,
			author: author,
			description: description,
			state: true,
			user: {
				id: user
			},
			image: {
				id: 1000
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
			.then(response => response.json())
			.catch(e => console.log(e))
	}

	/**
	 * Delete url to book.
	 */
	deselect() {
		this.book = null;
	}
}