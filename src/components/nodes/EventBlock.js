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

class EventBlock extends React.PureComponent {
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

	render() {
		const {
			classes, x, y, name, returnValues, selected, register, id,
			active, onClick, onContextMenuCapture, handleEndpointContext
		} = this.props;
		return (
			<NodeBase className={classes.root} x={x} y={y} onClick={onClick}
					  onContextMenuCapture={onContextMenuCapture} selected={selected}>
				<NodeHeader className={classes.header} prefix='(E)' name={name} id={id}/>
				<NodeBody>
					<NodeReturns executable={true} x={x} register={register} handleEndpointContext={handleEndpointContext}
								 parameters={returnValues} active={active}/>
				</NodeBody>
			</NodeBase>
		)
	}
}

export default withStyles(styles)(EventBlock);
