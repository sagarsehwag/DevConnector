import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
	if (alerts !== null && alerts.length > 0) {
		return alerts.map((alert) => {
			const { id, alertType, message } = alert;
			return (
				<div key={id} className={`alert alert-${alertType}`}>
					{message}
				</div>
			);
		});
	} else {
		return <div />;
	}
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	return {
		alerts: state.alert
	};
};

export default connect(mapStateToProps)(Alert);
