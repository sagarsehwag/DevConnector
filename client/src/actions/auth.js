import axios from "axios";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => {
	return async (dispatch) => {
		if (localStorage.token) setAuthToken(localStorage.token);

		try {
			const res = await axios.get("/api/auth");
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};
};

// Register User
export const register = ({ name, email, password }) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/users", { name, email, password });
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({ type: REGISTER_FAIL });
		}
	};
};

// export const login = (email, password) => {
// 	return async (dispatch) => {
// 		try {
// 			const response = await axios.post("/api/users", { email, password });
// 			dispatch({ type: LOGIN_SUCCESS, payload: response.data });
// 		} catch (error) {
// 			const errorsArray = error.response.data.errors;
// 			if (errorsArray) {
// 				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
// 			}

// 			dispatch({ type: LOGIN_FAIL });
// 		}
// 	};
// };
