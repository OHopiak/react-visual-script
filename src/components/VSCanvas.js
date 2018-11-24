import React from "react";
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import cx from 'classnames'
import FunctionBlock from "./FunctionBlock";
import ConnectionManager from "./ConnectionManager";
import {normalize} from "../utils";
import canvas_bg from '../assets/canvas_bg.svg'
import {execFunc} from "../logic/functions";

const defaultActive = () => ({params: [], returns: [], exec: {from: false, to: false}});

const countActiveEndpoints = (funcInfo) => {
	const active = {};
	if (!funcInfo) return active;
	funcInfo.forEach((node) => {
		if (!active[node.id])
			active[node.id] = defaultActive();
		if (node.connections)
			node.connections.forEach(conn => {
				if (!active[conn.from])
					active[conn.from] = defaultActive();
				active[conn.from].returns.push(conn.fromValue);
				active[node.id].params.push(conn.toValue);
			});
		if (node.exec) {
			if (!active[node.exec])
				active[node.exec] = defaultActive();
			active[node.id].exec.to = true;
			active[node.exec].exec.from = true;
		}
	});
	return active;
};

const styles = () => ({
	root: {
		zoom: 0.75,
		position: 'relative',
		height: '100%',
		width: '100%',
		outline: 'none',
		backgroundImage: `url(${canvas_bg})`,
		backgroundSize: '40px 40px',
		backgroundRepeat: 'repeat',
		margin: 0,
	},
});

class VSCanvas extends React.Component {
	static propTypes = {
		funcInfo: PropTypes.array.isRequired,
		functions: PropTypes.object.isRequired,
		editNode: PropTypes.func.isRequired,
		className: PropTypes.string,
		selected: PropTypes.number.isRequired,
		selectNode: PropTypes.func.isRequired,
	};

	state = {
		data: null,
	};

	constructor(props) {
		super(props);
		this.functionRefs = props.funcInfo.map(() => ({
			left: React.createRef(),
			right: React.createRef(),
		}));
	}

	getData = () => {
		const {funcInfo, functions, theme} = this.props;
		const normalFuncInfo = normalize(funcInfo);
		const offset = theme.connections.circleRadius + theme.connections.circleMargin + theme.connections.weight;
		return funcInfo.map((funcTo, idTo) => {
			const data = !funcTo.connections ? [] :
				funcTo.connections.map(connection => {
					const funcFrom = normalFuncInfo[connection.from];
					const idFrom = funcInfo.indexOf(funcFrom);
					const connFrom = connection.fromValue;
					const connTo = connection.toValue;
					const shiftFrom = functions[funcFrom.name].type === 'executable' ? 1 : 0;
					const shiftTo = functions[funcTo.name].type === 'executable' ? 1 : 0;
					const nodeFrom = this.functionRefs[idFrom].right.current.children[connFrom + shiftFrom];
					const nodeTo = this.functionRefs[idTo].left.current.children[connTo + shiftTo];
					return {
						x1: nodeFrom.offsetWidth - offset + nodeFrom.offsetLeft + funcFrom.x,
						y1: nodeFrom.offsetTop + nodeFrom.offsetParent.offsetTop + offset,
						x2: nodeTo.offsetLeft + offset + funcTo.x,
						y2: nodeTo.offsetTop + nodeTo.offsetParent.offsetTop + offset,
						type: functions[funcFrom.name].returnValues[connFrom].type,
					};
				});
			if (funcTo.exec) {
				const funcFrom = normalFuncInfo[funcTo.exec];
				const idFrom = funcInfo.indexOf(funcFrom);
				const nodeFrom = this.functionRefs[idFrom].left.current.children[0];
				const nodeTo = this.functionRefs[idTo].right.current.children[0];
				data.push({
					x1: nodeFrom.offsetWidth - offset + nodeFrom.offsetLeft + funcFrom.x,
					y1: nodeFrom.offsetTop + nodeFrom.offsetParent.offsetTop + offset,
					x2: nodeTo.offsetLeft + offset + funcTo.x,
					y2: nodeTo.offsetTop + nodeTo.offsetParent.offsetTop + offset,
					type: 'execution',
				});
			}
			return data;
		}).flat(1);
	};

	updateConnections = () => {
		this.setState(() => ({data: this.getData()}));
	};

	componentDidMount() {
		this.updateConnections();
		document.addEventListener("keydown", this.handleKey)
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKey)
	}

	exec = () => {
		const {funcInfo, functions} = this.props;
		const normalInfo = normalize(funcInfo);
		const outputs = {};
		const startExec = 3;
		execFunc(outputs, startExec, normalInfo, functions);
		console.log(outputs);
	};

	handleKey = e => {
		const {funcInfo, editNode, selected} = this.props;
		const node = {...funcInfo[selected]};
		const delta = 5;
		const UP = 'w', LEFT = 'a', DOWN = 's', RIGHT = 'd', ENTER = 'Enter';
		switch (e.key) {
			case UP:
				node.y -= delta;
				editNode(node);
				this.updateConnections();
				break;
			case LEFT:
				node.x -= delta;
				editNode(node);
				this.updateConnections();
				break;
			case RIGHT:
				node.x += delta;
				editNode(node);
				this.updateConnections();
				break;
			case DOWN:
				node.y += delta;
				editNode(node);
				this.updateConnections();
				break;
			case ENTER:
				this.exec();
				break;
			default:
				// console.log(e.key);
				break;
		}
	};

	render() {
		const {classes, funcInfo, functions, className, selectNode} = this.props;
		const {data} = this.state;
		const active = countActiveEndpoints(funcInfo);
		return (
			<div className={cx(classes.root, className)}>
				<ConnectionManager data={data}/>
				{funcInfo.map((func, i) =>
					<FunctionBlock {...functions[func.name]} {...func} key={func.id} onClick={selectNode(i)}
								   sidesRef={this.functionRefs[i]} active={active[func.id]}/>)}
			</div>
		);
	}
}

export default withStyles(styles)(VSCanvas);
