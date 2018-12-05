import React from 'react';
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'

const styles = theme => ({
	root: {
		boxShadow: theme.shadows[8],
		textAlign: 'left',
		borderRadius: 10,
		width: 200,
		display: 'flex',
		flexFlow: 'column',
		zIndex: 1,
		position: 'absolute',
		transition: 'top 0.15s ease, left 0.15s ease'
	},
	selected: {
		border: '3px solid white',
	},
});

const NodeBase = ({classes, className, x, y, selected, onClick, onContextMenuCapture, children}) => (
	<div className={cx(classes.root, className, selected && classes.selected)}
		 style={{top: y, left: x}}
		 onClick={onClick}
		 onContextMenuCapture={onContextMenuCapture}>
		{children}
	</div>
);
NodeBase.propTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	selected: PropTypes.bool,
	onClick: PropTypes.func,
	onContextMenuCapture: PropTypes.func,
	children: PropTypes.arrayOf(PropTypes.node)
};
NodeBase.defaultProps = {
	x: 0,
	y: 0,
	selected: false,
	onClick: () => false,
};

export default withStyles(styles)(NodeBase);
