import React from 'react'
import FunctionBlock from "./FunctionBlock";
import EventTrigger from "./EventTrigger";

const NodeBlock = ({nodeType, ...props}) => {
	let NodeComponent = null;
	switch (nodeType) {
		case 'Function':
			NodeComponent = FunctionBlock;
			// NodeComponent = DraggableFunctionBlock;
			break;
		case 'Event':
			NodeComponent = EventTrigger;
			break;
		default:
			break;
	}
	return NodeComponent ? <NodeComponent {...props}/> : '';
};

export default NodeBlock;
