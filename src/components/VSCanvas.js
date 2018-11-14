import React from "react";
import withStyles from 'react-jss'
import FunctionBlock from "./FunctionBlock";
import ConnectionManager from "./ConnectionManager";
import {functions, normalMockFuncInfo, mockFuncInfo} from "./mocks";

const styles = () => ({
	root: {
		position: 'relative',
	}
});

class VSCanvas extends React.Component {
	render() {
		const {classes, height, width} = this.props;
		return (
			<div className={classes.root} style={{height, width}}>
				<ConnectionManager width={'100%'} height={height} blocks={normalMockFuncInfo}/>
				{mockFuncInfo.map(func => <FunctionBlock {...functions[func.name]} {...func} key={func.id}/>)}
			</div>
		);
	}
}

export default withStyles(styles)(VSCanvas);
