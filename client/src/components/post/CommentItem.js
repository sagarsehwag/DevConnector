import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { deleteComment } from "../../actions/post";

const CommentItem = ({
	postId,
	comment: { _id, text, name, avatar, user, date },
	auth,
	deleteComment
}) => {
	return (
		<div className="post bg-light p-3 rounded my-1 row border">
			<div className="col-3">
				<Link to={`/profile/${user}`}>
					<img src={avatar} alt="" className="rounded-circle" />
					<h4>{name}</h4>
				</Link>
			</div>
			<div className="p-5 col">
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
				</p>
				{!auth.loading && user === auth.user._id ? (
					<button
						type="button"
						className="btn btn-danger"
						onClick={(e) => deleteComment(postId, _id)}
					>
						<i className="fas fa-times" />
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
