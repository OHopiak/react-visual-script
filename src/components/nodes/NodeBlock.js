import React from 'react'
import FunctionBlock from "./FunctionBlock";
import EventBlock from "./EventBlock";
import {EVENT, FUNCTION, OPERATION} from "../../logic/nodes/types";
import OperationBlock from "./OperationBlock";

const blocks = {
	[FUNCTION]: FunctionBlock,
	[EVENT]: EventBlock,
	[OPERATION]: OperationBlock,
};

const dataGetters = {
	[FUNCTION]: ({functions}) => functions,
	[EVENT]: ({events}) => events,
	[OPERATION]: ({operations}) => operations,
};

const NodeBlock = ({nodeType, ...props}) => {
	const NodeComponent = blocks[nodeType];
	const data = dataGetters[nodeType] ? dataGetters[nodeType](props)[props.name] : {};
	return NodeComponent && (
		<NodeComponent {...props} {...data}/>
	);
};

export default NodeBlock;
