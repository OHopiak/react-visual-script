import React from "react";
import PropTypes from "prop-types";
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = theme => ({
	endpoint: {
		width: (theme.connections.circleRadius + theme.connections.weight)*2,
		height: (theme.connections.circleRadius + theme.connections.weight)*2,
		r: theme.connections.circleRadius,
		fillOpacity: 0,
		strokeWidth: 2,

	},
	on: {
		strokeWidth: 1,
		fillOpacity: 1,
	},
	exec: {
		margin: '3px 2px 7px'
	},
	value: {
		margin: theme.connections.circleMargin,
	},
});

const Figure = ({type, className}) => type === 'execution' ? (
	<polygon className={className} points='3,3 13,8 3,13'/>
) : (
	<circle className={className} cx={8} cy={8} r={6}/>
);

const Endpoint = ({theme, classes, on, type}) => (
	<svg className={cx(classes.endpoint, (type === 'execution' ? classes.exec : classes.value), {on})}>
		<Figure type={type} className={cx(type, on && classes.on)}/>
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
