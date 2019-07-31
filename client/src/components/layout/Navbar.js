import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = (props) => {
	const {
		auth: { isAuthenticated, loading },
		logout
	} = props;

	const authLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/profiles">
					Developers
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/posts">
					Posts
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/dashboard">
					<i className="fas fa-user mr-1" /> Dashboard
				</Link>
			</li>
			<li className="nav-item">
				<Link onClick={logout} className="nav-link" to="#">
					<i className="fas fa-sign-out-alt mr-1" /> Logout
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/profiles">
					Developers
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/register">
					Register
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark navbar-expand-lg ">
			<Link to="/" className="navbar-brand">
				<i className="fas fa-code" /> DevConnector
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				{!loading && isAuthenticated ? authLinks : guestLinks}
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = {
	logout
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
