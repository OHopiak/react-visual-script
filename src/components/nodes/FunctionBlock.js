import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import NodeBase from "./basic/NodeBase";
import NodeHeader from "./basic/NodeHeader";
import NodeBody from "./basic/NodeBody";
import NodeParams from "./basic/NodeParams";
import NodeReturns from "./basic/NodeReturns";

const styles = () => ({
	header: {
		background: 'rgba(148, 208, 248, 0.95)',
	},
});

class FunctionBlock extends React.PureComponent {
	static propTypes = {
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		classes: PropTypes.object.isRequired,
		className: PropTypes.string,
		name: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['getter', 'transform', 'executable']).isRequired,
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
		handleNodeContext: PropTypes.func,
	};

	render() {
		const {
			classes, className, x, y, name, type, onContextMenuCapture, register,
			parameters, returnValues, active, onClick, selected, id, handleEndpointContext
		} = this.props;
		const executable = type === "executable";
		let prefix = '';
		switch (type) {
			case 'executable':
				prefix = '(f)';
				break;
			case 'transform':
				prefix = '(t)';
				break;
			case 'getter':
				prefix = '(g)';
				break;
			default:
				prefix = '(?)';
				break;
		}
		return (
			<NodeBase {...{x, y, onClick}} className={className} selected={selected}
					  onContextMenuCapture={onContextMenuCapture}>
				<NodeHeader className={classes.header} prefix={prefix} name={name} id={id}/>
				<NodeBody>
					<NodeParams executable={executable} x={x} register={register}
								parameters={parameters} active={active} handleEndpointContext={handleEndpointContext}/>
					<NodeReturns executable={executable} x={x} register={register}
								 parameters={returnValues} active={active} handleEndpointContext={handleEndpointContext}/>
				</NodeBody>
			</NodeBase>
		)
	}
}

export default withStyles(styles)(FunctionBlock);
