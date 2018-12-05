import {normalize} from "../utils";

class VSNode {
	static lastId = 0;

	constructor({name, nodeType}) {
		this.name = name;
		this.nodeType = nodeType;
	}

	getBaseInstance = () => {
		VSNode.lastId += 1;
		return {
			id: VSNode.lastId,
			name: this.name,
			nodeType: this.nodeType,
		}
	};
}

class VSFunction extends VSNode {
	constructor({name, type, parameters, returnValues, func}) {
		super({name, nodeType: 'Function'});
		this.type = type;
		this.parameters = parameters;
		this.returnValues = returnValues;
		this.func = func;
	}

	getInstance = (config) => {
		return {...this.getBaseInstance(), ...config};
	};
}

class VSEvent extends VSNode {
	constructor({name, returnValues}) {
		super({name, nodeType: 'Event'});
		this.returnValues = returnValues;
	}

	getInstance = (config) => {
		return {...this.getBaseInstance(), ...config}
	};
}

const execFunc = (outputs, id, normalInfo, functions) => {
	const node = normalInfo[id];
	const func = functions[node.name];
	const input = {};
	if (node.connections) node.connections.forEach(connection => {
		const nodeFrom = normalInfo[connection.from];
		const funcFrom = functions[nodeFrom.name];
		if (!outputs[nodeFrom.id])
			execFunc(outputs, nodeFrom.id, normalInfo, functions);
		const nameFrom = funcFrom.returnValues[connection.fromValue].name;
		const nameTo = func.parameters[connection.toValue].name;
		input[nameTo] = outputs[nodeFrom.id][nameFrom];
	});
	outputs[node.id] = func.func(input);
	if (node.exec)
		execFunc(outputs, node.exec, normalInfo, functions);
};

const processStart = (nodeInfo, functions) => {
	const normalInfo = normalize(nodeInfo);
	const outputs = {};
	const event = nodeInfo.find(el => el.name === 'process start');
	const startExec = event.exec;
	if (startExec)
		execFunc(outputs, startExec, normalInfo, functions);
	console.log(outputs);
};

export {
	VSNode,
	VSFunction,
	VSEvent,
	execFunc,
	processStart,
}
