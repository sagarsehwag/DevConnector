import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link className="nav-link" to="#">
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
			</div>
		</nav>
	);
};

export default Navbar;
