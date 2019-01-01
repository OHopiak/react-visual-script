import React from "react";
import PropTypes from 'prop-types'
import {EVENT, FUNCTION, OPERATION} from "../logic/nodes/types";
import ContextMenu from "./menus/ContextMenu";

class ContextHandler extends React.Component {
	static propTypes = {
		wrapper: PropTypes.object.isRequired,
		getSource: PropTypes.func.isRequired,
		deleteNode: PropTypes.func.isRequired,
		editNode: PropTypes.func.isRequired,
		funcRegister: PropTypes.object.isRequired,
		canvasPos: PropTypes.object.isRequired,
		nodeInfo: PropTypes.array.isRequired,
		children: PropTypes.func
	};

	state = {
		showContext: false,
		contextPos: {x: 0, y: 0},
		contextType: 'background',
		contextOptions: [],
	};

	getPos = e => {
		const {wrapper} = this.props;
		return {
			x: e.pageX - wrapper.current.offsetLeft,
			y: e.pageY - wrapper.current.offsetTop,
		}
	};

	handleGenericContext = (e, type = 'default', options = []) => {
		e.preventDefault();
		const pos = this.getPos(e);
		this.setState(() => ({
			showContext: true,
			contextPos: pos,
			contextType: type,
			contextOptions: options,
		}))
	};

	handleBackgroundContext = e => {
		// e.preventDefault();
		const {getSource} = this.props;
		const optionData = [
			{
				title: 'functions',
				nodeType: FUNCTION,
			},
			{
				title: 'operations',
				nodeType: OPERATION,
			},
		];
		this.handleGenericContext(e, 'background', optionData.map(({title, nodeType}) => ({
			title,
			type: 'list',
			children: Object.values(getSource(nodeType)).map(node => ({
				type: 'item',
				nodeType,
				title: node.name,
			}))
		})))
	};

	handleNodeContext = node => e => {
		this.handleGenericContext(e, 'node', [
			{
				type: 'item',
				title: 'Delete',
				data: node,
			}
		])
	};

	handleEndpointContext = (node) => endpointType => data => {
		const {nodeInfo, getSource} = this.props;
		// console.log(nodeInfo);
		const isParam = endpointType === 'param';
		const isReturn = endpointType === 'return';
		const connType = data.type === 'execution' ? 'exec' : 'param';
		const isConnected = data.type === 'execution'
			? (isParam && !!nodeInfo.find(x => x.exec === node.id)) || (isReturn && node.exec)
			: !!node.connections && !!node.connections.find(x => (isReturn && x.fromValue === data.pos) || (isParam && x.toValue === data.pos));

		const processParams = (func, otherNode) => {
			const paramList = isParam ? func.returnValues : func.parameters;
			if (!paramList) return null;
			if (isParam && node.connections && node.connections.find(p => p.toValue === data.pos)) return null;
			return paramList.map((param, i) => {
				if (param.type !== data.type) return null;
				if (!isParam && otherNode.connections && otherNode.connections.find(p => +p.toValue === i)) return null;
				return isParam ? {
					idFrom: otherNode.id,
					idTo: node.id,
					fromNode: otherNode,
					toNode: node,
					type: connType,
					toName: data.name,
					toValue: data.pos,
					fromName: param.name,
					fromValue: i,
				} : {
					idFrom: node.id,
					idTo: otherNode.id,
					fromNode: node,
					toNode: otherNode,
					type: connType,
					fromName: data.name,
					fromValue: data.pos,
					toName: param.name,
					toValue: i,

				}
			})
		};
		const processExec = (otherFunc, otherNode) => {
			if ((isReturn || otherFunc.nodeType !== EVENT) && otherFunc.type !== 'executable') return null;
			if (isParam && otherNode.exec) return null;
			return isParam ? {
				idFrom: otherNode.id,
				idTo: node.id,
				fromNode: otherNode,
				toNode: node,
				type: connType,
				fromName: otherNode.name,
				toName: node.name,
			} : {
				idFrom: node.id,
				idTo: otherNode.id,
				fromNode: node,
				toNode: otherNode,
				type: connType,
				fromName: node.name,
				toName: otherNode.name,
			}
		};

		const endpoints = nodeInfo.map(otherNode => {
			if (otherNode.id === node.id) return null;
			if (!(isParam || isReturn)) return null;
			const func = getSource(otherNode.nodeType)[otherNode.name];
			const processor = data.type === 'execution' ? processExec : processParams;
			return processor(func, otherNode)
		}).flat().filter(x => x);

		const options = [];
		if (endpoints.length > 0) options.push({
			title: 'Connect',
			children: endpoints.map(endp => {
				const {idFrom, fromName, toName, idTo} = endp;
				return {
					title: `${idFrom} (${fromName}) -> ${idTo} (${toName})`,
					data: {
						...endp,
						optionType: 'connect',
					},
				}
			}),
		});
		if (isParam && isConnected) options.push(connType === 'param' ? {
			title: 'Disconnect',
			data: {
				optionType: 'disconnect',
				type: connType,
				toValue: data.pos,
				toNode: node,
			},
		} : {
			title: 'Disconnect',
			data: {
				optionType: 'disconnect',
				type: connType,
				fromNode: nodeInfo.find(x => x.exec === node.id),
			},
		});
		return e => this.handleGenericContext(e, 'endpoint', options);
	};

	handleOptionChoice = option => e => {
		e.stopPropagation();
		this.hideContext();
		const {deleteNode, editNode, funcRegister, canvasPos, getSource} = this.props;
		const {contextType, contextPos} = this.state;
		switch (contextType) {
			case 'background':
				if (option.title) {
					const source = getSource(option.nodeType);
					if (!source) break;

					const node = source[option.title];
					if (node && node.getInstance)
						editNode(source[option.title].getInstance({
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
			case 'endpoint': {
				const {data} = option;
				if (!data) break;
				const {optionType, type, toNode, fromNode, idFrom, idTo, fromValue, toValue} = data;
				if (optionType === 'connect') {
					switch (type) {
						case 'param':
							const connections = toNode.connections ? toNode.connections : [];
							connections.push({
								from: idFrom,
								fromValue: fromValue,
								toValue: toValue,
							});
							editNode({...toNode, connections});
							break;
						case 'exec':
							editNode({...fromNode, exec: idTo});
							break;
						default:
					}
				} else {
					switch (type) {
						case 'param':
							const connections = toNode.connections ? toNode.connections.filter(x => +x.toValue !== +toValue) : [];
							console.log(toValue);
							editNode({...toNode, connections});
							break;
						case 'exec':
							editNode({...fromNode, exec: undefined});
							break;
						default:
					}

				}
				break;
			}
			default:
				console.log(option);
		}
	};

	hideContext = () => {
		this.setState(() => ({
			showContext: false,
		}))
	};

	render() {
		const {children} = this.props;
		const {contextPos, contextOptions, showContext} = this.state;
		const MenuNode = showContext &&
			<ContextMenu show
						 {...contextPos}
						 options={contextOptions}
						 handleChoice={this.handleOptionChoice}/>;
		const handlers = {
			handleBackgroundContext: this.handleBackgroundContext,
			handleNodeContext: this.handleNodeContext,
			hideContext: this.hideContext,
			handleEndpointContext: this.handleEndpointContext,
			MenuNode
		};
		return children && children(handlers);
	}
}

export default ContextHandler;
