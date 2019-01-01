import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = () => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		borderRadius: '0 0 10px 10px',
		height: '100%',
		background: 'rgba(49, 49, 49, 0.95)',
		color: 'white',
	},
});

const NodeBody = ({classes, className, children}) => (
	<div className={cx(classes.root, className)}>
		{children}
	</div>
);
NodeBody.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.node)
	])
};
NodeBody.defaultProps = {
	x: 0,
	y: 0,
	onClick: () => false,
};

export default withStyles(styles)(NodeBody);
