import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<section className="landing container">
			<div className="dark-overlay my-5">
				<div className="landing-inner bg-dark text-white p-5 rounded">
					<h1 className="x-large">Developer Connector</h1>
					<p className="lead">
						Create a developer profile/portfolio, share posts and get help from other
						developers
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary m-2">
							Sign Up
						</Link>
						<Link to="/login" className="btn btn-light m-2">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps)(Landing);
