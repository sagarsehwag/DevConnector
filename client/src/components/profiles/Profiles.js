import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import ProfileItem from "../profiles/ProfileItem";
import { getProfiles } from "../../actions/profile";

function Profiles({ getProfiles, profile: { profiles, loading } }) {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p>
						<i className="fab fa-connectdevelop mr-1" />
						Browser & Connect with Developers
					</p>

					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((profile) => {
								return <ProfileItem key={profile.id} profile={profile} />;
							})
						) : (
							<h4>No Profiles Found...</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		profile: state.profile
	};
};

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
