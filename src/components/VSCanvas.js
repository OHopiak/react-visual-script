import React from "react";
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import cx from 'classnames'
import ConnectionManager from "./ConnectionManager";
import canvas_bg from '../assets/canvas_bg.svg'
import {processStart} from "../logic/functions";
import NodeBlock from "./nodes/NodeBlock";
import ContextMenu from "./ContextMenu";
import NodeRegister from "../logic/NodeRegister";
import countActiveEndpoints from "../logic/endpoints";

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
		showContext: false,
		contextPos: {x: 0, y: 0},
		funcRegister: new NodeRegister(),
		contextOptions: [],
	};

	wrapperRef = React.createRef();

	register = funcData => {
		if (funcData.id) this.setState(state => ({
			funcRegister: state.funcRegister.withNode(funcData)
		}));
	};

	componentDidMount() {
		document.addEventListener("keydown", this.handleKey)
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKey)
	}

	handleKey = e => {
		if (!this.wrapperRef.current) return;
		const {nodeInfo, functions, selected, editNode} = this.props;
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
					this.setState(state => ({canvasLeft: state.canvasLeft + delta}));
					this.setState(() => ({canvasPos: newPos}));
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
				processStart(nodeInfo, functions);
				break;
			default:
				// console.log(e.key);
				break;
		}
	};

	handleLeftClick = () => {
		this.props.selectNode(-1)();
		this.setState(() => ({
			showContext: false,
		}))
	};

	handleBackgroundContext = e => {
		e.preventDefault();
		const wrapper = this.wrapperRef.current;
		const {functions} = this.props;
		const pos = {
			x: e.pageX - wrapper.offsetLeft,
			y: e.pageY - wrapper.offsetTop,
		};
		this.setState(() => ({
			showContext: true,
			contextPos: pos,
			contextType: 'background',
			contextOptions: Object.values(functions).map(func => ({
				type: 'item',
				title: func.name,
			}))
		}))
	};

	handleNodeContext = node => e => {
		e.preventDefault();
		const wrapper = this.wrapperRef.current;
		const pos = {
			x: e.pageX - wrapper.offsetLeft,
			y: e.pageY - wrapper.offsetTop,
		};
		this.setState(() => ({
			showContext: true,
			contextPos: pos,
			contextType: 'node',
			contextOptions: [
				{
					type: 'item',
					title: 'Delete',
					data: node,
				}
			]
		}))
	};

	handleOptionChoice = option => () => {
		const {deleteNode} = this.props;
		const {contextType, funcRegister} = this.state;

		switch (contextType) {
			case 'background':
				if (option.title) {
					const {editNode, functions} = this.props;
					const {canvasPos, contextPos} = this.state;
					editNode(functions[option.title].getInstance({
							x: contextPos.x - canvasPos.left,
							y: contextPos.y - canvasPos.top,
						}),
					)
				}
				break;
			case 'node':
				if (option.data && option.data.id) {
					delete funcRegister.data[option.data.id];
					deleteNode(option.data.id);
				}
				break;
			default:
				console.log(option);
		}
	};

	render() {
		const {
			classes, nodeInfo, functions,
			className, selectNode, selected
		} = this.props;
		const {
			canvasPos, funcRegister, showContext,
			contextPos, contextOptions
		} = this.state;
		const active = countActiveEndpoints(nodeInfo);
		const connections = funcRegister.getConnections(nodeInfo, functions);
		console.count("rendered");
		return (
			<div className={cx(classes.root, className)}
				 ref={this.wrapperRef}
				 onContextMenuCapture={this.handleBackgroundContext}
				 onClickCapture={this.handleLeftClick}>
				<div className={cx(classes.canvas)} style={canvasPos}>
					{nodeInfo.map((node, i) =>
						<NodeBlock {...functions[node.name]}
								   {...node}
								   key={node.id}
								   onContextMenuCapture={this.handleNodeContext(node)}
								   onClick={selectNode(i)}
								   active={active[node.id]}
								   register={this.register}
								   selected={selected === i}
						/>
					)}
					<ConnectionManager connections={connections}/>
				</div>
				<ContextMenu show={showContext}
							 {...contextPos}
							 options={contextOptions}
							 handleChoice={this.handleOptionChoice}/>
			</div>
		);
	}
}

export default withStyles(styles)(VSCanvas);
