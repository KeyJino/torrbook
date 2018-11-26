import React from "react";
import {inject, observer} from 'mobx-react';
import {Button} from "react-bootstrap";
import Book from "../components/Book";
import Pagination from "react-js-pagination"

import './index.css'


/**
 * Book component. Component content function to working with book.
 */
@inject('bookStore', 'userService')
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
		this.props.bookStore.loadAll();
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
		this.props.bookStore.findBookByTitle(this.bookTitle.current.value)
	}

	render() {
		const {props: {bookStore: {books}}} = this;
		const role = this.props.userService.checkRole;

		return (
			<div>

				<div className="div">
					<input type="text" ref={this.bookTitle} onChange={() => this.search()}/>
				</div>


				{books.slice(this.state.activePage * 10 - 10, this.state.activePage * 10).map(
					({
						 id: book_id,
						 title,
						 state,
						 request,
						 image
					 }) => (<div key={book_id}>
						{state === true ?
							<Book
								book_id={book_id}
								title={title}
								bookState={state && !request ?
									"Можно взять" : request ?
										"В запросах" : "На руках"}
								image={image}
								btn={
									role('ADMIN') ?
										<Button bsSize="xsmall" bsStyle="danger"
												onClick={() =>
													this.props.bookStore.delete(book_id)}>Удалить
										</Button> :


										role('USER') ?
											<Button bsSize="xsmall" bsStyle="primary"
													onClick={() => {
														this.addRequest(book_id);
														this.changeBookRequest(book_id);
													}}
													disabled={request}>Попросить
											</Button>
											: null
								}
							/> : null
						}
					</div>))
				}


				{role('MODER')
					? (
						<Button bsSize="xsmall" bsStyle="success" onClick={() =>
							this.props.bookStore.create()}>Добавить книгу
						</Button>
					)
					: null
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
