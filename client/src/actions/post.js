import axios from "axios";
// import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

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
