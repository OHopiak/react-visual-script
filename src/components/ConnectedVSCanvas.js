import React from "react";
import VSCanvas from "./VSCanvas";
import {mockFunctions, mockNodeInfo} from "./mocks";

/*
const withStore = connect(state => ({
	functions: state.rvs.functions,
	nodeInfo: state.rvs.functionInfo,
	selected: state.rvs.selected,
}), dispatch => ({
	editNode: data => dispatch(editNode(data))
}));
*/

class ConnectedVSCanvas extends React.PureComponent {
	state = {
		functions: {...mockFunctions},
		nodeInfo: [...mockNodeInfo],
		selected: -1,
	};

	editNode = (data) => {
		const {nodeInfo} = this.state;
		const newInfo = [...nodeInfo];
		const i = newInfo.findIndex(el => (+el.id) === (+data.id));
		if (i >= 0) {
			newInfo[i] = data;
		} else {
			newInfo.push(data);
		}
		this.setState(() => ({nodeInfo: newInfo}));
	};

	deleteNode = id => {
		const {nodeInfo} = this.state;
		this.setState(() => ({nodeInfo: nodeInfo.filter(node => +node.id !== +id)}));
	};

	selectNode = i => () => {
		this.setState(() => ({selected: i}))
	};

	render(){
		return <VSCanvas {...this.props} {...this.state}
						 editNode={this.editNode}
						 deleteNode={this.deleteNode}
						 selectNode={this.selectNode}/>
	}
}

// export default withStore(VSCanvas)
export default ConnectedVSCanvas;
