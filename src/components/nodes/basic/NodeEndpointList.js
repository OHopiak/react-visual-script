import React from 'react';
import PropTypes from 'prop-types'
import NodeColumn from "./NodeColumn";
import Execution from "../endpoints/Execution";
import Parameter from "../endpoints/Parameter";
import {getParamType} from "../../../logic/endpoints";
import withStyles from "react-jss";

const getX = {
	params: (node, offset, x) => node.offsetLeft + offset + x,
	return: (node, offset, x) => node.offsetWidth - offset + node.offsetLeft + x,
};
const getY = (node, offset) => node.offsetTop + node.offsetParent.offsetTop + offset;

class NodeEndpointList extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		executable: PropTypes.bool,
		parameters: PropTypes.arrayOf(PropTypes.object),
		activeExec: PropTypes.bool,
		activeParams: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
		columnRef: PropTypes.object,
		hideNames: PropTypes.bool,
		returnValue: PropTypes.bool,
		register: PropTypes.func,
	};

	columnRef = React.createRef();

	getLocation = i => {
		const {x, theme, parameters, executable, returnValue} = this.props;
		const current = this.columnRef.current;
		if (!current || !current.children || current.children.length === 0 || i >= current.children.length)
			return null;
		const node = current.children[i];
		const computeX = returnValue ? getX.return : getX.params;
		return {
			x: computeX(node, theme.nodeOffset, x),
			y: getY(node, theme.nodeOffset),
			type: getParamType(parameters, executable)(i),
		}
	};

	componentDidMount() {
		const {register, parameters, executable} = this.props;
		register(
			this.getLocation,
			getParamType(parameters, executable)
		)
	}

	render() {
		const {
			className, executable, parameters, activeExec,
			activeParams, returnValue, hideNames, handleEndpointContext
		} = this.props;
		return (
			<NodeColumn className={className} columnRef={this.columnRef}>
				{executable && <Execution on={activeExec} onContextMenuCapture={handleEndpointContext({type: 'execution'})} />}
				{parameters && parameters.map(({name, type}, i) =>
					<Parameter key={name}
							   name={name}
							   type={type}
							   hideName={hideNames}
							   on={activeParams.includes(i)}
							   returnValue={returnValue}
							   onContextMenuCapture={handleEndpointContext({pos: i, name, type})}
					/>)}
			</NodeColumn>
		)
	}
}

export default withStyles(() => ({}))(NodeEndpointList);
