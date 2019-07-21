import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
	const { component: Component, auth, ...rest } = props;
	const { isAuthenticated, loading } = auth;

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(PrivateRoute);
