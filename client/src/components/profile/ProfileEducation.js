import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
	return (
		<div className="profile-edu bg-light p-4 my-3 rounded">
			<h2>Education</h2>

			{education.length > 0 ? (
				<Fragment>
					{education.map((edu) => {
						const { school, degree, fieldofstudy, to, from, description } = edu;
						return (
							<Fragment>
								<h4 className="m-0 mt-2">{school}</h4>
								<p className="m-0">
									<Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
									{to === null ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
								</p>
								<p className="m-0">
									<strong>Degree: </strong> {degree}
								</p>
								<p className="m-0">
									<strong>Field Of Study: </strong> {fieldofstudy}
								</p>
								<p className="m-0">
									<strong>Description: </strong> {description}
								</p>
							</Fragment>
						);
					})}
				</Fragment>
			) : (
				<h4>No education credentials</h4>
			)}
		</div>
	);
};

ProfileEducation.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileEducation;
