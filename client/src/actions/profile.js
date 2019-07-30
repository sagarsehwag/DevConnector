import axios from "axios";

import { setAlert } from "./alert";
import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS
} from "./types";

// Get Current User's Profile
export const getCurrentProfile = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get("/api/profile/me");
			dispatch({ type: GET_PROFILE, payload: res.data });
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Get Profile by UserId
export const getProfileById = (userId) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/api/profile/user/${userId}`);
			dispatch({ type: GET_PROFILE, payload: res.data });
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Get Github Repos
export const getGithubRepos = (username) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`/api/profile/github/${username}`);
			dispatch({ type: GET_REPOS, payload: res.data });
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Get All Profiles
export const getProfiles = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: CLEAR_PROFILE });
			const res = await axios.get("/api/profile");
			dispatch({ type: GET_PROFILES, payload: res.data });
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Create or Update Profile
export const createProfile = (formData, history, edit = false) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/profile", formData);
			dispatch({ type: GET_PROFILE, payload: res.data });

			const message = edit ? "Profile Updated" : "Profile Created";
			dispatch(setAlert(message, "success"));

			if (!edit) {
				history.push("/dashboard");
			}
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Add Experience
export const addExperience = (formData, history) => {
	return async (dispatch) => {
		try {
			const res = await axios.put("/api/profile/experience", formData);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });
			dispatch(setAlert("Experience Added", "success"));
			history.push("/dashboard");
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Add Education
export const addEducation = (formData, history) => {
	return async (dispatch) => {
		try {
			const res = await axios.put("/api/profile/education", formData);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });
			dispatch(setAlert("Education Added", "success"));
			history.push("/dashboard");
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

// Delete Experience
export const deleteExperience = (id) => {
	return async (dispatch) => {
		try {
			const res = await axios.delete(`/api/profile/experience/${id}`);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });

			dispatch(setAlert("Experience Removed", "success"));
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

export const deleteEducation = (id) => {
	return async (dispatch) => {
		try {
			const res = await axios.delete(`/api/profile/education/${id}`);
			dispatch({ type: UPDATE_PROFILE, payload: res.data });

			dispatch(setAlert("Education Removed", "success"));
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: error.response.statusText,
					status: error.response.status
				}
			});
		}
	};
};

export const deleteAccount = () => {
	return async (dispatch) => {
		if (window.confirm("Are you sure? This cannot be undone")) {
			try {
				await axios.delete("/api/profile");
				dispatch({ type: CLEAR_PROFILE });
				dispatch({ type: ACCOUNT_DELETED });

				dispatch(setAlert("Account Deleted", "success"));
			} catch (error) {
				const errorsArray = error.response.data.errors;
				if (errorsArray) {
					errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
				}

				dispatch({
					type: PROFILE_ERROR,
					payload: {
						msg: error.response.statusText,
						status: error.response.status
					}
				});
			}
		}
	};
};
