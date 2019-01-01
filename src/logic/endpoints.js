const defaultActive = () => ({params: [], returns: [], exec: {from: false, to: false}});

const countActiveEndpoints = (nodeInfo) => {
	const active = {};
	if (!nodeInfo) return active;
	nodeInfo.forEach((node) => {
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

const getParamType = (parameters, executable) => i => {
	let result = null;
	if (executable) {
		if (i === 0)
			result = 'execution';
		else if (parameters && i <= parameters.length)
			result = parameters[i - 1].type;
	} else if (parameters && i < parameters.length)
		result = parameters[i].type;
	return result;
};

export default countActiveEndpoints
export {
	getParamType,
}
