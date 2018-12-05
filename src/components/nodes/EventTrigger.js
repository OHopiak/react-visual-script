import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import NodeBase from "./basic/NodeBase";
import NodeHeader from "./basic/NodeHeader";
import NodeBody from "./basic/NodeBody";
import NodeReturns from "./basic/NodeReturns";

const styles = () => ({
	root: {
		width: 150,
	},
	header: {
		background: 'rgba(248, 148, 148, 0.95)',
	},
});

class EventBlock extends React.Component {
	static propTypes = {
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		classes: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		returnValues: PropTypes.arrayOf(PropTypes.object),
		active: PropTypes.shape({
			returns: PropTypes.arrayOf(PropTypes.number).isRequired,
			exec: PropTypes.shape({
				to: PropTypes.bool,
			}),
		}).isRequired,
		register: PropTypes.func.isRequired,
		onClick: PropTypes.func,
		selected: PropTypes.bool,
		onContextMenuCapture: PropTypes.func,
	};
	right = React.createRef();

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

	getReturnType = i => {
		const {returnValues} = this.props;
		let result = null;
		if (i === 0)
			result = 'execution';
		else if (returnValues && i <= returnValues.length)
			result = returnValues[i - 1].type;
		return result;
	};

	getNodeOffset = () => {
		const {theme} = this.props;
		return theme.connections.circleRadius + theme.connections.circleMargin + theme.connections.weight;
	};

	componentDidMount() {
		const {id, register, name} = this.props;
		const {getReturnLocation, getReturnType} = this;
		register({
			id,
			name,
			getReturnLocation,
			getReturnType,
		});
	}

	render() {
		const {
			classes, x, y, name, returnValues, selected,
			active, onClick, onContextMenuCapture
		} = this.props;
		let prefix = '(E)';
		return (
			<NodeBase className={classes.root} x={x} y={y} onClick={onClick}
					  onContextMenuCapture={onContextMenuCapture} selected={selected}>
				<NodeHeader className={classes.header} prefix={prefix} name={name}/>
				<NodeBody>
					<NodeReturns columnRef={this.right} executable={true}
								 parameters={returnValues} active={active}/>
				</NodeBody>
			</NodeBase>
		)
	}
}

export default withStyles(styles)(EventBlock);
