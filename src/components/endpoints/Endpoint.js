import React from "react";
import PropTypes from "prop-types";
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = () => ({
	endpoint: {
		width: 16,
		height: 16,
	},
	on: {
		strokeWidth: 1,
		fillOpacity: 1,
	},
	off: {
		fillOpacity: 0,
		strokeWidth: 2,
	},
	exec: {
		margin: '3px 2px 7px'
	},
	value: {
		margin: 2,
	},
});

const Figure = ({type, className}) => type === 'execution' ? (
	<polygon className={className} points='3,3 13,8 3,13'/>
) : (
	<circle className={className} cx={8} cy={8} r={6}/>
);

const Endpoint = ({theme, classes, on, type}) => (
	<svg className={cx(classes.endpoint, 'endpoint', (type === 'execution' ? classes.exec : classes.value), {on})}>
		<Figure type={type} className={cx(type, (on ? classes.on : classes.off))}/>
	</svg>
);
Endpoint.propTypes = {
	classes: PropTypes.object,
	on: PropTypes.bool,
	type: PropTypes.oneOf(['string', 'int', 'float', 'object', 'array', 'execution']).isRequired,
};
Endpoint.defaultProps = {
	on: false
};

export default withStyles(styles)(Endpoint);
