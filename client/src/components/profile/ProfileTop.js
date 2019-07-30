import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		social,
		user: { name, avatar }
	}
}) => {
	return (
		<div className="profile-top bg-light p-4 my-3 rounded">
			<img className="rounded-circle my-1 mx-auto row" src={avatar} alt="" />
			<h1 className="mx-auto row">{name}</h1>
			<p className="row mx-auto">
				{status} {"at"} {company ? <span> {company}</span> : ""}
			</p>
			<p>{location ? <span>{location}</span> : ""}</p>
			<div className="icons my-1 row mx-auto">
				{website && (
					<a href={website} className="mx-2">
						<i className="fas fa-globe fa-2x" />
					</a>
				)}

				{social && social.twitter ? (
					<a href={social.twitter} className="mx-2">
						<i className="fab fa-twitter fa-2x" />
					</a>
				) : (
					""
				)}

				{social && social.facebook ? (
					<a href={social.facebook} className="mx-2">
						<i className="fab fa-facebook fa-2x" />
					</a>
				) : (
					""
				)}

				{social && social.linkedin ? (
					<a href={social.linkedin} className="mx-2">
						<i className="fab fa-linkedin fa-2x" />
					</a>
				) : (
					""
				)}

				{social && social.youtube ? (
					<a href={social.youtube} className="mx-2">
						<i className="fab fa-youtube fa-2x" />
					</a>
				) : (
					""
				)}

				{social && social.instagram ? (
					<a href={social.instagram} className="mx-2">
						<i className="fab fa-instagram fa-2x" />
					</a>
				) : (
					""
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
