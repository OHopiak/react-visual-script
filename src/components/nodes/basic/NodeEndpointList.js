import React from 'react';
import PropTypes from 'prop-types'
import NodeColumn from "./NodeColumn";
import Execution from "../endpoints/Execution";
import Parameter from "../endpoints/Parameter";

const NodeEndpointList = ({className, executable, parameters, columnRef, activeExec, activeParams, returnValue}) => (
	<NodeColumn className={className} columnRef={columnRef}>
		{executable && <Execution on={activeExec}/>}
		{parameters && parameters.map(({name, type}, i) =>
			<Parameter key={name} {...{name, type}}
					   on={activeParams.includes(i)}
					   returnValue={returnValue}/>)}
	</NodeColumn>
);
NodeEndpointList.propTypes = {
	className: PropTypes.string,
	executable: PropTypes.bool,
	parameters: PropTypes.arrayOf(PropTypes.object),
	activeExec: PropTypes.bool,
	activeParams: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	columnRef: PropTypes.object,
};
NodeEndpointList.defaultProps = {};

export default NodeEndpointList;
