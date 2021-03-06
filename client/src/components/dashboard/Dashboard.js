import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = (props) => {
	const {
		getCurrentProfile,
		auth: { user },
		profile: { profile, loading },
		deleteAccount
	} = props;

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	if ((loading && !profile) || !user) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<h1>Dashboard</h1>
				<h3>
					<i className="fas fa-user mr-2" />
					Welcome {user.name}
				</h3>

				{profile !== null ? (
					<Fragment>
						<DashboardActions className="my-1" />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
					</Fragment>
				) : (
					<Fragment>
						<p className="my-1">You have not yet setup profile</p>
						<Link to="/create-profile" className="btn btn-primary my-1">
							Create Profile
						</Link>
					</Fragment>
				)}

				<div className="my-2">
					<button className="btn btn-danger" onClick={() => deleteAccount()}>
						<i className="fas fa-user-minus mr-2" />
						Delete My Account
					</button>
				</div>
			</Fragment>
		);
	}
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		profile: state.profile
	};
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
