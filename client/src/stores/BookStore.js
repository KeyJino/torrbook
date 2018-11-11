import {action, observable} from "mobx";

const CONTEXT_URL = process.env.REACT_APP_API_URL || '';
const BOOK_URL = CONTEXT_URL + '/api/user/books';
const REQUEST_BOOK_URL = CONTEXT_URL + '/api/requests';


export default class BookStore {
	@observable
	books = [];

	@observable
	book = null;

	loadAll() {
		fetch(BOOK_URL)
			.then(response => response.json())
			.then(action(books => this.books = books))
			.catch(error => console.error(error.message))
	}

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

	delete(identity) {
		fetch(BOOK_URL + "/" + identity, {method: 'DELETE'})
			.then(() => this.deleteHandler(identity))
			.catch(e => console.error(e.message))
	}

	@action
	deleteHandler(identity) {
		const itemIndex = this.books.findIndex(({id}) => id === identity);
		if (itemIndex > -1) {
			this.books.splice(itemIndex, 1);
		}
	}

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