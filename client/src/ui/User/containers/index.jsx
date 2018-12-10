import React from 'react'
import {inject, observer} from 'mobx-react'

@inject('userStore')
@observer()
/**
 * UserButton component
 */
export default class User extends React.Component{

	/**
	 * When component full loading.
	 */
	componentDidMount() {
		this.props.userStore.loadAll();
	}

	/**
	 * Deleting some user from store.
	 * @param id is UserButton.
	 */
	delete(id) {
		this.props.userStore.delete(id);
	}

	/**
	 * What doing when closing component.
	 */
	componentWillUnmount() {
		this.props.userStore.deselect();
	}

	/**
	 * Drawing component.
	 * @returns {*} component
	 */
	render() {
		const {props: {userStore: {users}}} = this;
		return (
			<div>
				{users.map(({id, username, about, bookGiven, bookTaken}) => (
					<div key={id}>
						{state === true
							? <div>
								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'ADMIN'
									? (<button onClick={() => this.delete(id)}>X</button>)
									: null
								}
								{(JSON.parse(sessionStorage.getItem('user')))
									.role.title === 'USER'
									? (<button onClick={() => this.request(id)}>+</button>)
									: null
								}

								{title}
							</div>
							: null}
					</div>
				))}

				<Button onClick={() =>
					this.props.bookStore.create()}>Добавить книгу
				</Button>
			</div>);
	}
}