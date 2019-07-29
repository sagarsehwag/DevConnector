import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfileById } from "../../actions/profile";

function Profile({
	getProfileById,
	profile: { profile, loading },
	auth: { isAuthenticated, user, loading: authLoading },
	match
}) {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-dark mx-1">
						Back To Profiles
					</Link>
					{isAuthenticated && !authLoading && user._id === profile.user._id ? (
						<Link to="/edit-profile" className="btn btn-primary mx-1">
							Edit Profile
						</Link>
					) : (
						""
					)}

					<ProfileTop profile={profile} />
					<ProfileAbout profile={profile} />
				</Fragment>
			)}
		</Fragment>
	);
}

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ getProfileById }
)(Profile);
