import React from "react";
import PropTypes from "prop-types";
import cx from 'classnames'
import Endpoint from "./Endpoint";
import withStyles from 'react-jss'

const styles = () => ({
	root: {
		height: 20,
		width: '100%',
		lineHeight: '19px',
		display: 'flex',
		flexDirection: 'row',
		fontSize: '0.9rem',
	},
	text: {
		paddingLeft: 3,
	},
	return: {
		flexDirection: 'row-reverse',
	}
});
const Parameter = ({classes, name, type, on, returnValue}) => (
	<div className={cx(classes.root, {[classes.return]: returnValue})}>
		<Endpoint type={type} on={on}/><span>{name}</span>
	</div>
);
Parameter.propTypes = {
	name: PropTypes.string.isRequired,
	returnValue: PropTypes.bool,
	// classes: PropTypes.object,
	on: PropTypes.bool,
	type: PropTypes.oneOf(['string', 'int', 'float', 'object', 'array']).isRequired,
};
Parameter.defaultProps = {
	returnValue: false,
	on: false
};

export default withStyles(styles)(Parameter);
