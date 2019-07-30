import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ profile: { experience } }) => {
	return (
		<div className="profile-exp">
			<h2>Experience</h2>

			{experience.length > 0 ? (
				<Fragment>
					{experience.map((exp) => {
						const { company, title, to, from, description } = exp;
						return (
							<Fragment>
								<div className="bg-light p-4 my-3 rounded">
									<h4 className="m-0 mt-2">{company}</h4>
									<p className="m-0">
										<Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
										{to === null ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
									</p>
									<p className="m-0">
										<strong>Position: </strong> {title}
									</p>
									<p className="m-0">
										<strong>Description: </strong> {description}
									</p>
								</div>
							</Fragment>
						);
					})}
				</Fragment>
			) : (
				<h4>No experience credentials</h4>
			)}
		</div>
	);
};

ProfileExperience.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileExperience;
