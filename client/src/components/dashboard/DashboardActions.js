import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
	return (
		<div className="dash-buttons">
			<Link to="/edit-profile" className="btn btn-primary mr-1">
				<i className="fas fa-user-circle mr-1" /> Edit Profile
			</Link>
			<Link to="/add-experience" className="btn btn-primary mx-1">
				<i className="fab fa-black-tie mr-1" /> Add Experience
			</Link>
			<Link to="/add-education" className="btn btn-primary mx-1">
				<i className="fas fa-graduation-cap mr-1" /> Add Education
			</Link>
		</div>
	);
};

export default DashboardActions;
