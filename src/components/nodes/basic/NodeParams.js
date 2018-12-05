import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import NodeEndpointList from "./NodeEndpointList";

const styles = () => ({
	root: {
		alignItems: 'flex-start',
	},
});

class NodeParams extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		className: PropTypes.string,
		executable: PropTypes.bool,
		parameters: PropTypes.arrayOf(PropTypes.object),
		active: PropTypes.object,
		columnRef: PropTypes.object,
	};


	render() {
		const {classes, executable, parameters, active, columnRef} = this.props;
		return (
			<NodeEndpointList className={classes.root}
							  {...{columnRef, executable, parameters}}
							  activeExec={active.exec && active.exec.from}
							  activeParams={active.params}
			/>
		)
	}
}

export default withStyles(styles)(NodeParams);
