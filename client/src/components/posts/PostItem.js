import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
	addLike,
	removeLike,
	deletePost
}) => {
	return (
		<Fragment>
			<div className="bg-light my-1 row border rounded">
				<div className="col-3 p-3 pl-4">
					<Link to={`/profile/${user}`}>
						<img className="rounded-circle justify-content-center" src={avatar} alt="" />
						<h4 className="text-center">{name}</h4>
					</Link>
				</div>
				<div className="col py-5 pr-4">
					<p className="my-1">{text}</p>
					<p>
						Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
					</p>
					<button
						type="button"
						className="btn btn-success mx-1"
						onClick={(e) => addLike(_id)}
					>
						<i className="fas fa-thumbs-up" />
						{likes.length > 0 ? <span className="pl-1">{likes.length}</span> : ""}
					</button>
					<button
						type="button"
						className="btn btn-dark mx-1"
						onClick={(e) => removeLike(_id)}
					>
						<i className="fas fa-thumbs-down" />
					</button>
					<Link to={`/post/${_id}`} className="btn btn-primary mx-1">
						Discussion {comments.length > 0 ? <span>{comments.length}</span> : ""}
					</Link>
					{!auth.loading && user === auth.user._id ? (
						<button
							type="button"
							className="btn btn-danger mx-1"
							onClick={(e) => deletePost(_id)}
						>
							<i className="fas fa-times" />
						</button>
					) : (
						""
					)}
				</div>
			</div>
		</Fragment>
	);
};

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ addLike, removeLike, deletePost }
)(PostItem);
