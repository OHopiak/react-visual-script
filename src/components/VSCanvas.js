import React from "react";
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import FunctionBlock from "./FunctionBlock";
import ConnectionManager from "./ConnectionManager";
import {mockFuncInfo, mockFunctions} from "./mocks";
import {normalize} from "../utils";

const styles = () => ({
	root: {
		position: 'relative',
	}
});

class VSCanvas extends React.Component {
	static propTypes = {
		height: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]).isRequired,
		width: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		]).isRequired,
		funcInfo: PropTypes.array,
		functions: PropTypes.object,
	};

	functionRefs = mockFuncInfo.map(() => ({
		left: React.createRef(),
		right: React.createRef(),
	}));

	state = {
		data: null,
	};

	getData = () => {
		// mocks
		const {funcInfo, functions} = this.props;
		const normalFuncInfo = normalize(funcInfo);
		return funcInfo.map((funcFrom, idFrom) => !funcFrom.connections ? [] :
			funcFrom.connections.map(connection => {
				const funcTo = normalFuncInfo[connection.to];
				const idTo = funcInfo.indexOf(funcTo);
				const connFrom = connection.fromValue;
				const connTo = connection.toValue;
				const nodeFrom = this.functionRefs[idFrom].right.current.children[connFrom + 1];
				const nodeTo = this.functionRefs[idTo].left.current.children[connTo + 1];
				return {
					x1: nodeFrom.offsetWidth - 10 + nodeFrom.offsetLeft + funcFrom.x,
					y1: nodeFrom.offsetTop + nodeFrom.offsetParent.offsetTop + 10,
					x2: nodeTo.offsetLeft + 10 + funcTo.x,
					y2: nodeTo.offsetTop + nodeTo.offsetParent.offsetTop + 10,
					type: functions[funcFrom.name].returnValues[connFrom].type,
				};
			})).flat(1);
	};

	handleClick = () => {
		this.setState(() => ({data: this.getData(), fetched: true}));
	};

	componentDidMount() {
		this.handleClick();
	}

	render() {
		const {classes, height, width} = this.props;
		const {data} = this.state;
		return (
			<div className={classes.root} style={{height, width}}>
				<ConnectionManager width={'100%'} height={height} data={data}/>
				{mockFuncInfo.map((func, i) => <FunctionBlock {...mockFunctions[func.name]} {...func} key={func.id}
															  sidesRef={this.functionRefs[i]}/>)}
			</div>
		);
	}
}

export default withStyles(styles)(VSCanvas);
