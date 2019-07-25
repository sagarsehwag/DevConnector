import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ education }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>{edu.fieldofstudy}</td>
			<td>
				<Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
				{edu.to === null ? "Now" : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
			</td>
			<td>
				<button className="btn btn-danger">Delete</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className="my-3">Education Credentional</h2>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Field Of Study</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	experience: PropTypes.array.isRequired
};

export default Education;
