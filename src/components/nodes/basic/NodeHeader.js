import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = () => ({
	root: {
		textAlign: 'center',
		borderRadius: '10px 10px 0 0',
		height: 32,
		fontSize: '0.9rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '0 1 auto',
		background: 'rgba(49, 49, 49, 0.95)',
	},
});

const NodeHeader = ({classes, className, prefix, name, id}) => (
	<div className={cx(classes.root, className)}><span>{prefix} [{id}] {name}</span></div>
);
NodeHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	prefix: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
NodeHeader.defaultProps = {};

export default withStyles(styles)(NodeHeader);
