import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
	profile: {
		bio,
		skills,
		user: { name }
	}
}) => {
	return (
		<div className="bg-light p-4 rounded">
			{bio ? (
				<Fragment>
					<h2>{name.trim().split(" ")[0]}'s Bio</h2>
					<p>{bio}</p>
				</Fragment>
			) : (
				""
			)}

			<h2>Skill Set</h2>
			<div>
				{skills.map((skill, index) => {
					return (
						<span key={index} className="p-1">
							<i className="fas fa-check" /> {skill}
						</span>
					);
				})}
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
