import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import cx from 'classnames'
import NodeEndpointList from "./NodeEndpointList";

const styles = () => ({
	root: {
		alignItems: 'flex-start',
	},
});

class NodeParams extends React.PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		className: PropTypes.string,
		executable: PropTypes.bool,
		parameters: PropTypes.arrayOf(PropTypes.object),
		active: PropTypes.object,
		columnRef: PropTypes.object,
		hideNames: PropTypes.bool,
		register: PropTypes.func.isRequired,
	};

	render() {
		const {
			classes, className, executable, hideNames,
			parameters, active, register, x, handleEndpointContext,
		} = this.props;
		return (
			<NodeEndpointList className={cx(classes.root, className)}
							  {...{executable, parameters, hideNames}}
							  activeExec={active.exec && active.exec.from}
							  activeParams={active.params}
							  x={x}
							  register={register('param')}
							  handleEndpointContext={handleEndpointContext('param')}

			/>
		)
	}
}

export default withStyles(styles)(NodeParams);
