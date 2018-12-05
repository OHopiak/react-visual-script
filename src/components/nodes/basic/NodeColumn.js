import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = () => ({
	root: {
		padding: 5,
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		width: '50%',
	},
});

const NodeColumn = ({classes, className, columnRef, children}) => (
	<div className={cx(classes.root, className)} ref={columnRef}>
		{children}
	</div>
);
NodeColumn.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	columnRef: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.node, PropTypes.arrayOf(PropTypes.node)
	])
};
NodeColumn.defaultProps = {};

export default withStyles(styles)(NodeColumn);
