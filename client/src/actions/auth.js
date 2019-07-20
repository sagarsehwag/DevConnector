import axios from "axios";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => {
	return async (dispatch) => {
		try {
			if (localStorage.token) setAuthToken(localStorage.token);
			const res = await axios.get("/api/auth");
			dispatch({ type: USER_LOADED, payload: res.data.user });
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
			dispatch(loadUser());
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}

			dispatch({ type: REGISTER_FAIL });
		}
	};
};

// Login User
export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const res = await axios.post("/api/auth", { email, password });
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			dispatch(loadUser());
		} catch (error) {
			const errorsArray = error.response.data.errors;
			if (errorsArray) {
				errorsArray.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}
			dispatch({ type: LOGIN_FAIL });
		}
	};
};

// Logout User & Clear Profile
export const logout = () => {
	return async (dispatch) => {
		dispatch({ type: LOGOUT });
	};
};
