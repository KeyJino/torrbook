import React from 'react'
import "./Book.css"

const image  =  "resources/images/";

export default class Book extends React.Component {

	constructor(props) {
		super(props);
		this.title = props.title;
		this.book_id = props.book_id;
		this.bookState = props.bookState;
		this.url = props.image.url;
		this.btn = props.btn;
		this.description = props.description;
	}

	render() {


		return (
			<div>
				<ul className="ul">
					<li className="li">
						<img src={image + this.url} className="avatar" alt="avatar"/>
						<div className="lines">
							<h4>{this.title}</h4>
							<p>
								{this.description}
							</p>
						</div>
						{this.btn}
					</li>
				</ul>
			</div>
		)
	}

}