import {normalize} from "../utils";

const execFunc = (outputs, id, normalInfo, functions) => {
	const node = normalInfo[id];
	const func = functions[node.name];
	const input = {};
	let newOutputs = {...outputs};
	if (node.connections) node.connections.forEach(connection => {
		const nodeFrom = normalInfo[connection.from];
		const funcFrom = functions[nodeFrom.name];
		if (!newOutputs[nodeFrom.id])
			newOutputs = execFunc(newOutputs, nodeFrom.id, normalInfo, functions);
		const nameFrom = funcFrom.returnValues[connection.fromValue].name;
		const nameTo = func.parameters[connection.toValue].name;
		input[nameTo] = newOutputs[nodeFrom.id][nameFrom];
	});
	newOutputs[node.id] = func.func(input);
	if (node.exec)
		newOutputs = execFunc(newOutputs, node.exec, normalInfo, functions);
	return newOutputs;
};

const execFuncAsync = async (outputs, id, normalInfo, functions, operations) => {
	const node = normalInfo[id];
	const func = functions[node.name];
	const input = {};
	let newOutputs = {...outputs};
	if (node.connections) node.connections.forEach(connection => {
		const nodeFrom = normalInfo[connection.from];
		const funcFrom = functions[nodeFrom.name];
		if (!newOutputs[nodeFrom.id])
			newOutputs = execFunc(newOutputs, nodeFrom.id, normalInfo, functions);

		const nameFrom = funcFrom.returnValues[connection.fromValue].name;
		const nameTo = func.parameters[connection.toValue].name;
		input[nameTo] = newOutputs[nodeFrom.id][nameFrom];
	});
	newOutputs[node.id] = await func.getFuncPromise(input);
	if (node.exec)
		newOutputs = await execFuncAsync(newOutputs, node.exec, normalInfo, functions);
	return newOutputs;
};

const processStart = async (nodeInfo, functions, operations) => {
	const normalInfo = normalize(nodeInfo);
	let outputs = {};
	const event = nodeInfo.find(el => el.name === 'process start');
	const startExec = event.exec;
	if (startExec)
		outputs = execFunc(outputs, startExec, normalInfo, functions, operations);
	return outputs;
};

export default processStart;
