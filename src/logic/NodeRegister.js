import {normalize} from "../utils";
import {EVENT, FUNCTION, OPERATION} from "./nodes/types";

const offsets = {
	[FUNCTION]: ({functions, func}) => functions[func.name].type === 'executable' ? 1 : 0,
	[EVENT]: () => 1,
	[OPERATION]: () => 0,
};


class NodeRegister {
	constructor(defaultRegister = {}) {
		this.data = defaultRegister;
	}

	getConnections = (nodeInfo, functions) => {
		const normalNodeInfo = normalize(nodeInfo);
		return nodeInfo.map((func) => {
			const data = !func.connections ? [] :
				func.connections.map(({from, fromValue, toValue}) => {
					const funcFrom = normalNodeInfo[from];
					const idFrom = fromValue + offsets[funcFrom.nodeType]({functions, func: funcFrom});
					const idTo = toValue + offsets[func.nodeType]({functions, func});
					return this.getConnectionData(funcFrom.id, func.id, idFrom, idTo);
				});
			if (func.exec)
				data.push(this.getConnectionData(func.id, func.exec, 0, 0));
			return data;
		}).flat(1).filter(x => x !== null);
	};

	getConnectionData = (from, to, fromValue, toValue) => {
		if (!this.data[from] || !this.data[to]) return null;
		const posFrom = this.data[from].getReturnLocation(fromValue);
		const posTo = this.data[to].getParamLocation(toValue);
		return {
			x1: posFrom.x,
			y1: posFrom.y,
			x2: posTo.x,
			y2: posTo.y,
			type: posFrom.type,
		};
	};

	withNode = node => new NodeRegister({
		...this.data,
		[node.id]: {...this.data[node.id], ...node},
	})
}

export default NodeRegister;
