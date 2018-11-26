import React from 'react'
import "./Book.css"

const image  =  "/resources/images/";

export default class Book extends React.Component {

	constructor(props) {
		super(props);
		this.title = props.title;
		this.book_id = props.book_id;
		this.bookState = props.bookState;
		this.url = props.image.url;
		this.btn = props.btn;
	}

	render() {
		return (
			<div>
				<ul className="ul">
					<li className="li">
						<img src={image + this.url} className="avatar" alt="avatar"/>
						<div className="lines">
							{this.title}
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus urna non turpis
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus urna non turpis
								{this.btn}
							</p>
						</div>
					</li>
				</ul>
			</div>
		)
	}

}