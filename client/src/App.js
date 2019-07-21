import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

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
					<Route exact path="/" component={Landing} />
					<section className="container p-5">
						<Alert />
						<Switch>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
					</section>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
