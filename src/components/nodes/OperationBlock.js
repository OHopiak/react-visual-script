import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import cx from 'classnames'
import NodeBase from "./basic/NodeBase";
import NodeBody from "./basic/NodeBody";
import NodeParams from "./basic/NodeParams";
import NodeReturns from "./basic/NodeReturns";

const styles = () => ({
	root: {
		width: 110,
	},
	body: {
		background: 'rgba(148, 248, 182, 0.95)',
		color: 'black',
		fontWeight: 'bolder',
		borderRadius: 10,
	},
	name: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	params: {
		justifyContent: 'center',
	},
});

class OperationBlock extends React.PureComponent {
	static propTypes = {
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		classes: PropTypes.object.isRequired,
		className: PropTypes.string,
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		parameters: PropTypes.arrayOf(PropTypes.object),
		returnValues: PropTypes.arrayOf(PropTypes.object),
		active: PropTypes.shape({
			params: PropTypes.arrayOf(PropTypes.number).isRequired,
			returns: PropTypes.arrayOf(PropTypes.number).isRequired,
			exec: PropTypes.shape({
				from: PropTypes.bool,
				to: PropTypes.bool,
			}),
		}).isRequired,
		register: PropTypes.func.isRequired,
		selected: PropTypes.bool,
		onContextMenuCapture: PropTypes.func,
	};

	render() {
		const {
			classes, className, x, y, name, onContextMenuCapture, register,
			parameters, returnValues, active, onClick, selected, handleEndpointContext
		} = this.props;
		return (
			<NodeBase {...{x, y, onClick}} className={cx(className, classes.root)} selected={selected}
					  onContextMenuCapture={onContextMenuCapture}>
				<NodeBody className={classes.body}>
					<NodeParams hideNames className={classes.params} x={x} register={register}
								parameters={parameters} active={active} handleEndpointContext={handleEndpointContext}/>
					<div className={classes.name}>
						<div>{name}</div>
					</div>
					<NodeReturns hideNames className={classes.params} x={x} register={register}
								 parameters={returnValues} active={active} handleEndpointContext={handleEndpointContext}/>
				</NodeBody>
			</NodeBase>
		)
	}
}

export default withStyles(styles)(OperationBlock);
