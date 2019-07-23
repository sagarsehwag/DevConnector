import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middlwares = [thunk]; // Array of middlewares

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlwares))
);

export default store;
