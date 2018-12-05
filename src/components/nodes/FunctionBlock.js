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

class FunctionBlock extends React.Component {
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
	};
	left = React.createRef();
	right = React.createRef();

	getParamLocation = i => {
		const {x} = this.props;
		const current = this.left.current;
		if (!current || !current.children || current.children.length === 0 || i >= current.children.length)
			return null;
		const node = current.children[i];
		const offset = this.getNodeOffset();
		return {
			x: node.offsetLeft + offset + x,
			y: node.offsetTop + node.offsetParent.offsetTop + offset,
		}
	};

	getReturnLocation = i => {
		const {x} = this.props;
		if (!this.right.current) return null;

		const node = this.right.current.children[i];
		const offset = this.getNodeOffset();
		return {
			x: node.offsetWidth - offset + node.offsetLeft + x,
			y: node.offsetTop + node.offsetParent.offsetTop + offset,
			type: this.getReturnType(i),
		}
	};

	getParamType = i => {
		const {parameters, type} = this.props;
		const executable = type === "executable";
		let result = null;

		if (executable) {
			if (i === 0)
				result = 'execution';
			else if (parameters && i <= parameters.length)
				result = parameters[i - 1].type;
		} else if (parameters && i < parameters.length)
			result = parameters[i].type;

		return result;
	};
	getReturnType = i => {
		const {returnValues, type} = this.props;
		const executable = type === "executable";
		let result = null;

		if (executable) {
			if (i === 0)
				result = 'execution';
			else if (returnValues && i <= returnValues.length)
				result = returnValues[i - 1].type;
		} else if (returnValues && i < returnValues.length)
			result = returnValues[i].type;

		return result;
	};

	getNodeOffset = () => {
		const {theme} = this.props;
		return theme.connections.circleRadius + theme.connections.circleMargin + theme.connections.weight;
	};

	componentDidMount() {
		const {id, register, name} = this.props;
		const {getParamLocation, getReturnLocation, getParamType, getReturnType} = this;
		register({
			id,
			name,
			getParamLocation,
			getReturnLocation,
			getParamType,
			getReturnType,
		});
	}

	render() {
		const {
			classes, className, x, y, name, type, onContextMenuCapture,
			parameters, returnValues, active, onClick, selected
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
				<NodeHeader className={classes.header} prefix={prefix} name={name}/>
				<NodeBody>
					<NodeParams columnRef={this.left} executable={executable}
								parameters={parameters} active={active}/>
					<NodeReturns columnRef={this.right} executable={executable}
								 parameters={returnValues} active={active}/>
				</NodeBody>
			</NodeBase>
		)
	}
}

export default withStyles(styles)(FunctionBlock);
