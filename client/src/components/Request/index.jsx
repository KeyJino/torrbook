import React from "react";
import {inject, observer} from 'mobx-react';

@inject('requestStore')
@observer
export default class Request extends React.Component {

	componentDidMount() {
		this.props.requestStore.loadAll();
	}

	delete(id) {
		this.props.requestStore.delete(id);
	}

	approve(id) {
		this.props.requestStore.approve(id);
	}

	render() {
		const {props: {requestStore: {requests}}} = this;
		return (
			<div>
				{requests.map(({id, state, book, user}) => (
					<div key={id}>
						{(JSON.parse(sessionStorage.getItem('user')))
							.role.title === 'MODER'
							? (
								<div>
									<button onClick={() => this.delete(id)}>R</button>
									<button onClick={() => this.approve(id)}>A</button>
								</div>
							)
							: null
						}

							{state.toString()} _ {book.title} _ {user.username}
					</div>
				))}
			</div>
		)
	}
}