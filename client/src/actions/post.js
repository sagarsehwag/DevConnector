import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST } from "./types";

// Get Posts
export const getPosts = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get("/api/posts");
			dispatch({ type: GET_POSTS, payload: res.data });
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Add Like
export const addLike = (postId) => {
	return async (dispatch) => {
		try {
			const res = await axios.put(`/api/posts/like/${postId}`);
			dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Remove Like
export const removeLike = (postId) => {
	return async (dispatch) => {
		try {
			const res = await axios.put(`/api/posts/unlike/${postId}`);
			dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Delete Post
export const deletePost = (postId) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/api/posts/${postId}`);
			dispatch({ type: DELETE_POST, payload: postId });
			dispatch(setAlert("Post Removed", "success"));
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Add Post
export const addPost = (formData) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/posts", formData);
			dispatch({ type: ADD_POST, payload: res.data.post });
			dispatch(setAlert("Post Created", "success"));
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

export const getPost = (id) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/api/posts/${id}`);
			dispatch({ type: GET_POST, payload: res.data });
		} catch (error) {
			dispatch({
				type: POST_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};
