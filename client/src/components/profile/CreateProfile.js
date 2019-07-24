import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		company: "",
		websites: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<div>
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user mr-1" /> Let's get some information to make your profile
				stand out
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<select name="status" className="form-control" onChange={(e) => onChange(e)}>
						<option value={0}>* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						className="form-control"
						value={company}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						Could be your own company or one you work for
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						className="form-control"
						value={website}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">Could be your own or a company website</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						className="form-control"
						value={location}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">City &amp; state suggested (eg. Boston, MA)</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						className="form-control"
						value={skills}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						name="githubusername"
						className="form-control"
						value={githubusername}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						defaultValue={""}
						className="form-control"
						value={bio}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">Tell us a little about yourself</small>
				</div>
				<div className="my-2">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
					>
						Add Social Network Links
					</button>
				</div>

				{displaySocialInputs ? (
					<Fragment>
						<div className="form-group row mx-auto mt-3">
							<i className="fab fa-twitter fa-2x col-1" />
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								className="form-control col-10"
								value={twitter}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group row mx-auto">
							<i className="fab fa-facebook fa-2x col-1" />
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								className="form-control col-10"
								value={facebook}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group row mx-auto">
							<i className="fab fa-youtube fa-2x col-1" />
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								className="form-control col-10"
								value={youtube}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group row mx-auto">
							<i className="fab fa-linkedin fa-2x col-1" />
							<input
								type="text"
								placeholder="Linkedin URL"
								name="linkedin"
								className="form-control col-10"
								value={linkedin}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group row mx-auto">
							<i className="fab fa-instagram fa-2x col-1" />
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								className="form-control col-10"
								value={instagram}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</Fragment>
				) : (
					<Fragment />
				)}

				<input type="submit" className="btn btn-primary my-1 mx-2" />
				<a className="btn btn-primary my-1 mx-2" href="dashboard.html">
					Go Back
				</a>
			</form>
		</div>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default connect(
	null,
	{ createProfile }
)(withRouter(CreateProfile));
