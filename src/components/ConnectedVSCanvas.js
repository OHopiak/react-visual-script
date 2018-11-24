import React from "react";
import VSCanvas from "./VSCanvas";
import {mockFuncInfo, mockFunctions} from "./mocks";

/*
const withStore = connect(state => ({
	functions: state.rvs.functions,
	funcInfo: state.rvs.functionInfo,
	selected: state.rvs.selected,
}), dispatch => ({
	editNode: data => dispatch(editNode(data))
}));
*/

class ConnectedVSCanvas extends React.Component {
	state = {
		functions: {...mockFunctions},
		funcInfo: [...mockFuncInfo],
		selected: 2,
	};

	editNode = (data) => {
		const {funcInfo} = this.state;
		const newInfo = [...funcInfo];
		const i = newInfo.findIndex(el => (+el.id) === (+data.id));
		if (i >= 0) {
			newInfo[i] = data;
		}
		this.setState(() =>({funcInfo: newInfo}));
	};

	selectNode = i => () => {
		this.setState(() => ({selected: i}))
	};

	render(){
		return <VSCanvas {...this.props} {...this.state} editNode={this.editNode} selectNode={this.selectNode}/>
	}
}

// export default withStore(VSCanvas)
export default ConnectedVSCanvas;
