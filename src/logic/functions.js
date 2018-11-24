
class VSNode {
	getInstance = () => ({})
}

class VSFunction extends VSNode {
	static lastId = 0;

	constructor({name, type, parameters, returnValues, func}) {
		super();
		this.name = name;
		this.type = type;
		this.parameters = parameters;
		this.returnValues = returnValues;
		this.func = func;
	}

	getInstance = (config) => {
		VSFunction.lastId += 1;
		return {id: VSFunction.lastId, name: this.name, ...config}
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

export {
	VSNode,
	VSFunction,
	execFunc,
}
