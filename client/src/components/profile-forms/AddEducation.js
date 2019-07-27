import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: ""
	});

	const [toDateDisabled, toggleDisabled] = useState(false);
	const { school, degree, fieldofstudy, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};

	return (
		<Fragment>
			<div>
				<h1 className="large text-primary">Add Your Education</h1>
				<p className="lead">
					<i className="fas fa-code-branch" /> Add any school or bootcamp you have
					attended
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="* Degree"
							name="degree"
							className="form-control"
							required
							value={degree}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="* School"
							name="school"
							className="form-control"
							required
							value={school}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Field Of Study"
							name="fieldofstudy"
							className="form-control"
							value={fieldofstudy}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group">
						<h4>From Date</h4>
						<input
							type="date"
							name="from"
							className="form-control"
							value={from}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div className="form-group form-check">
						<input
							type="checkbox"
							name="current"
							className="form-check-input"
							id="current"
							checked={current}
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>
						<label className="form-check-label" htmlFor="current">
							Current Job
						</label>
					</div>
					<div className="form-group">
						<h4>To Date</h4>
						<input
							type="date"
							name="to"
							className="form-control"
							value={to}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
							}}
							disabled={toDateDisabled ? "disabled" : ""}
						/>
					</div>
					<div className="form-group">
						<textarea
							name="description"
							cols={30}
							rows={5}
							placeholder="Program Description"
							className="form-control"
							value={description}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type="submit" className="btn btn-primary my-1" />
					<Link className="btn btn-dark my-1 mx-2" to="/dashboard">
						Go Back
					</Link>
				</form>
			</div>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addEducation }
)(withRouter(AddEducation));
