import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPost } from "../../actions/post";

import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match.params.id]);

	if (loading || post === null) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<Link to="/posts" className="btn btn-dark mb-2">
					Back To Posts
				</Link>
				<PostItem post={post} showActions={false} />
				<CommentForm postId={post._id} />
				<div className="comments">
					{post.comments.map((comment) => {
						return <CommentItem key={comment._id} comment={comment} postId={post._id} />;
					})}
				</div>
			</Fragment>
		);
	}
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		post: state.post
	};
};

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
