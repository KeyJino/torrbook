import React from "react";
import {inject, observer} from 'mobx-react';
import Book from "../components/Book";
import Pagination from "react-js-pagination"

import './index.css'


/**
 * Book component. Component content function to working with book.
 */
@inject('bookStore', 'userService', 'requestStore')
@observer
export default class Books extends React.Component {
	constructor(props) {
		super(props);
		this.bookTitle = React.createRef();
		this.state = {
			activePage: 1
		}
	}

	handlePageChange(pageNumber) {
		this.setState({activePage: pageNumber});
	}

	/**
	 * What doing when component load.
	 */
	componentDidMount() {
		if (this.props.userService.checkRole('MODER'))
			this.props.bookStore.loadById(JSON.parse(sessionStorage.getItem('user')).id);
		else
			this.props.bookStore.loadAll();

		this.props.requestStore.loadAll(JSON.parse(sessionStorage.getItem('user')).id)
	}

	/**
	 * Delete request by id.
	 */
	delete(id) {
		this.props.bookStore.delete(id);
	}

	/**
	 * Adding request to Book.
	 * @param id
	 */
	addRequest(id) {
		this.props.bookStore.requestBook(JSON.parse(sessionStorage.getItem('user')).id, id);
	}


	/**
	 * Changed book request state.
	 * @param id of book.
	 */
	changeBookRequest(id) {
		this.props.bookStore.changeRequest(id);
	}

	/**
	 * What doing when component is closing.
	 */
	componentWillUnmount() {
		this.props.bookStore.deselect();
	}

	search() {
		let check = this.bookTitle.current.value;
		if (check.length < 15) {
			this.props.bookStore.findBookByTitle(check);
		}
	}

	render() {
		const {props: {bookStore: {books}}} = this;
		const role = this.props.userService.checkRole;
		const {props: {requestStore: {requests}}} = this;

		return (
			<div>

				<form className="div">
					<h5> Book's name </h5>
					<input type="text"
						   ref={this.bookTitle}
						   onChange={() => this.search()}/>
				</form>


				{books.slice(this.state.activePage * 10 - 10, this.state.activePage * 10).map(
					({
						 id: book_id,
						 title,
						 state,
						 request,
						 description,
						 image
					 }) => (<div key={book_id}>
						{
							state === true ?
								<Book
									book_id={book_id}
									title={title}
									bookState={state && !request ?
										"Можно взять" : request ?
											"В запросах" : "На руках"}
									image={image}
									description={description}
									btn={
										role('MODER') ?
											<input type="button"
												   value="Удалить"
												   className="book-del-inp"
												   onClick={() =>
													   this.props.bookStore.delete(book_id)}/> :


											role('USER') ?
												<input type="button"
													   value="Попросить"
													   className="book-req-inp"
													   onClick={() => {
														   this.addRequest(book_id);
														   this.changeBookRequest(book_id);
													   }}
												/>
												: null
									}
								/> : null
						}
					</div>))
				}

				<div className="div">
					<Pagination
						activePage={this.state.activePage}
						itemsCountPerPage={10}
						totalItemsCount={this.props.bookStore.books.length}
						pageRangeDisplayed={5}
						onChange={::this.handlePageChange}
					/>
				</div>
			</div>

		);
	}
}
