import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import NodeEndpointList from "./NodeEndpointList";

const styles = () => ({
	root: {
		alignItems: 'flex-end',
	},
});

const NodeReturns = ({classes, className, executable, parameters, active, columnRef}) => (
	<NodeEndpointList className={classes.root}
					  {...{columnRef, executable, parameters}}
					  activeExec={active.exec && active.exec.to}
					  activeParams={active.returns}
					  returnValue/>
);
NodeReturns.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	executable: PropTypes.bool,
	parameters: PropTypes.arrayOf(PropTypes.object),
	active: PropTypes.object,
	columnRef: PropTypes.object,
};
NodeReturns.defaultProps = {};

export default withStyles(styles)(NodeReturns);
