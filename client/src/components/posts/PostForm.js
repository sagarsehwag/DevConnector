import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
	const [text, setText] = useState("");

	return (
		<div className="my-3">
			<div className="p-1 pl-3 pt-2 bg-light rounded">
				<h4>Say Something...</h4>
			</div>
			<form
				className="form-group my-2"
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text });
					setText("");
				}}
			>
				<textarea
					name="text"
					rows="5"
					placeholder="Create a post"
					className="form-control my-1"
					required
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<input type="submit" className="btn btn-primary my-1" defaultValue="Submit" />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addPost }
)(PostForm);
