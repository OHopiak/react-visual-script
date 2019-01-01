import React from "react";
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import cx from 'classnames'
import ConnectionManager from "./ConnectionManager";
import canvas_bg from '../assets/canvas_bg.svg'
import processStart from "../logic/exec";
import NodeBlock from "./nodes/NodeBlock";
import NodeRegister from "../logic/NodeRegister";
import countActiveEndpoints from "../logic/endpoints";
import {EVENT, FUNCTION, OPERATION} from "../logic/nodes/types";
import ContextHandler from "./ContextHandler";

const delta = 5;
const canvasWidth = 3000;
const canvasHeight = 2000;
const UP = 'w', LEFT = 'a', DOWN = 's', RIGHT = 'd', ENTER = 'Enter';

const styles = () => ({
	root: {
		position: 'relative',
		height: '100%',
		width: '100%',
		overflow: 'hidden',
	},
	canvas: {
		// zoom: 0.75,
		position: 'relative',
		height: canvasHeight,
		width: canvasWidth,
		outline: 'none',
		backgroundImage: `url(${canvas_bg})`,
		// TODO: add blur to the background, or change the pattern
		// filter: 'blur(8px)',
		backgroundSize: '40px 40px',
		backgroundRepeat: 'repeat',
		margin: 0,
		transition: 'top 0.2s ease, left 0.2s ease'
	},
});

class VSCanvas extends React.PureComponent {
	static propTypes = {
		nodeInfo: PropTypes.array.isRequired,
		functions: PropTypes.object.isRequired,
		events: PropTypes.object.isRequired,
		operations: PropTypes.object.isRequired,
		className: PropTypes.string,
		selected: PropTypes.number.isRequired,
		editNode: PropTypes.func.isRequired,
		deleteNode: PropTypes.func.isRequired,
		selectNode: PropTypes.func.isRequired,
	};

	state = {
		canvasPos: {
			top: -400,
			left: -600,
		},
		funcRegister: new NodeRegister(),
		showContext: false,
		contextPos: {x: 0, y: 0},
		contextOptions: [],
	};

	wrapperRef = React.createRef();

	registerNode = funcData => {
		if (funcData.id) this.setState(state => ({
			funcRegister: state.funcRegister.withNode(funcData)
		}));
	};

	register = (id, name) => type => (getLocation, getType) => {
		if (type === 'param')
			this.registerNode({
				id,
				name,
				getParamLocation: getLocation,
				getParamType: getType,
			});
		else if (type === 'return')
			this.registerNode({
				id,
				name,
				getReturnLocation: getLocation,
				getReturnType: getType,
			});
	};

	componentDidMount() {
		document.addEventListener("keydown", this.handleKey)
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKey)
	}

	getSource = type => {
		const {functions, operations, events} = this.props;
		const blocks = {
			[FUNCTION]: functions,
			[EVENT]: events,
			[OPERATION]: operations,
		};
		return blocks[type];
	};

	handleKey = e => {
		if (!this.wrapperRef.current) return;
		const {nodeInfo, functions, operations, selected, editNode} = this.props;
		const {canvasPos} = this.state;
		const node = {...nodeInfo[selected]};
		const wrapperWidth = this.wrapperRef.current.offsetWidth;
		const wrapperHeight = this.wrapperRef.current.offsetHeight;
		const newPos = {...canvasPos};
		switch (e.key) {
			case UP:
				if (selected !== -1) {
					node.y -= delta;
					editNode(node);
				} else if (newPos.top >= wrapperHeight - canvasHeight + delta) {
					newPos.top -= delta;
					this.setState(() => ({canvasPos: newPos}));
				}
				break;
			case LEFT:
				if (selected !== -1) {
					node.x -= delta;
					editNode(node);
				} else if (newPos.left >= wrapperWidth - canvasWidth + delta) {
					newPos.left -= delta;
					this.setState(() => ({canvasPos: newPos}));
				}
				break;
			case RIGHT:
				if (selected !== -1) {
					node.x += delta;
					editNode(node);
				} else if (newPos.left <= -delta) {
					newPos.left += delta;
					this.setState(state => ({canvasLeft: state.canvasLeft + delta, canvasPos: newPos}));
				}
				break;
			case DOWN:
				if (selected !== -1) {
					node.y += delta;
					editNode(node);
				} else if (newPos.top <= -delta) {
					newPos.top += delta;
					this.setState(() => ({canvasPos: newPos}));
				}
				break;
			case ENTER:
				processStart(nodeInfo, functions, operations)
					.then(o => console.log(o))
					.catch(err => console.error(err));
				break;
			default:
				// console.log(e.key);
				break;
		}
	};

	handleLeftClick = ({hideContext}) => e => {
		this.props.selectNode(-1)();
		hideContext();
	};

	selectNode = (i) => e => {
		e.stopPropagation();
		const {selectNode} = this.props;
		selectNode(i)();
	};

	render() {
		const {
			classes, nodeInfo, functions, events, operations,
			className, selected, deleteNode, editNode,
		} = this.props;
		const {
			canvasPos, funcRegister
		} = this.state;
		const active = countActiveEndpoints(nodeInfo);
		const connections = funcRegister.getConnections(nodeInfo, functions);
		console.count("rendered");
		return (
			<ContextHandler canvasPos={canvasPos}
							deleteNode={deleteNode}
							editNode={editNode}
							funcRegister={funcRegister}
							getSource={this.getSource}
							nodeInfo={nodeInfo}
							wrapper={this.wrapperRef}>
				{({handleBackgroundContext, handleNodeContext, handleEndpointContext, hideContext, MenuNode}) =>
					<div className={cx(classes.root, className)}
						 ref={this.wrapperRef}
						 onContextMenuCapture={handleBackgroundContext}
						 onClick={this.handleLeftClick({hideContext})}>
						<div className={cx(classes.canvas)} style={canvasPos}>
							{nodeInfo.map((node, i) =>
								<NodeBlock functions={functions}
										   events={events}
										   operations={operations}
										   {...node}
										   key={node.id}
										   onContextMenuCapture={handleNodeContext(node)}
										   onClick={this.selectNode(i)}
										   active={active[node.id]}
										   register={this.register(node.id, node.name)}
										   selected={selected === i}
										   handleEndpointContext={handleEndpointContext(node)}
								/>
							)}
							<ConnectionManager connections={connections}/>
						</div>
						{MenuNode}
					</div>
				}
			</ContextHandler>
		);
	}
}

export default withStyles(styles)(VSCanvas);
