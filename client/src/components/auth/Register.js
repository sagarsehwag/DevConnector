import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});

	const { name, email, password, password2 } = formData;
	const { setAlert, register } = props;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Password does not match", "danger");
		} else {
			register({ name, email, password });
		}
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						className="form-control"
						value={name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						className="form-control"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						autoComplete="off"
						className="form-control"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						autoComplete="off"
						className="form-control"
						value={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

const mapDispatchToProps = {
	setAlert,
	register
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
