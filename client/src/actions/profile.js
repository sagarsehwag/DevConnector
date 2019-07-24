import axios from "axios";

import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

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
			dispatch(setAlert(message), "success");

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
