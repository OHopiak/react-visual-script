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
const Parameter = ({classes, name, type, on, returnValue, hideName, onContextMenuCapture}) => (
	<div className={cx(classes.root, returnValue && classes.return)} onContextMenuCapture={onContextMenuCapture}>
		<Endpoint type={type} on={on}/>{!hideName && <span>{name}</span>}
	</div>
);
Parameter.propTypes = {
	name: PropTypes.string.isRequired,
	returnValue: PropTypes.bool,
	// classes: PropTypes.object,
	on: PropTypes.bool,
	type: PropTypes.oneOf(['string', 'int', 'float', 'object', 'array']).isRequired,
	hideName: PropTypes.bool,
	onContextMenuCapture: PropTypes.func,
};
Parameter.defaultProps = {};

export default withStyles(styles)(Parameter);
