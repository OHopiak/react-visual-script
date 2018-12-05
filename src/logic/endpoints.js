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

export default countActiveEndpoints
