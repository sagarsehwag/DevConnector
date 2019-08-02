import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import Routes from "./components/routing/Routes";

// Authorisation
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Redux
import store from "./store";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
