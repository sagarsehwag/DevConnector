import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileItem({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills
	}
}) {
	return (
		<div className="my-1 rounded bg-light border">
			<div className="profile row">
				<img src={avatar} alt="" className="rounded-circle mx-4 my-4 col-3" />
				<div className="col my-4 py-5">
					<h2>{name}</h2>
					<p>
						{status} {company ? <span> at {company}</span> : ""}
					</p>
					<p className="my-1">{location ? <span>{location}</span> : ""}</p>
					<Link to={`profile/${_id}`} className="btn btn-primary">
						View Profile
					</Link>
				</div>
				<ul className="col my-4 py-5">
					{skills.slice(0, 4).map((skill, index) => {
						return (
							<li key={index}>
								<i className="fas fa-check mr-1" />
								{skill}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
