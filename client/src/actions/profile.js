import axios from "axios";

import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

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
