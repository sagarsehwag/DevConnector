import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({ experience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			<td>
				<Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
				{exp.to === null ? "Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
			</td>
			<td>
				<button className="btn btn-danger">Delete</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 className="my-3">Experience Credentional</h2>
			<table className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired
};

export default Experience;
