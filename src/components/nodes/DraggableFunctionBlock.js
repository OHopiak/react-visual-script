import React from 'react'
import PropTypes from 'prop-types'
import {DragSource} from 'react-dnd';
import FunctionBlock from "./FunctionBlock";
import withStyles from "react-jss";

const styles = () => ({
	container: {
		position: 'relative',
		transform: 'translate3d(0, 0, 0)',
	},
	dragging: {
		opacity: 0.5,
	},
});

const FUNCTION_TYPE = 'function';

const functionSource = {
	beginDrag(props) {
		return {};
	}
};

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
});

const DraggableFunctionBlock = ({connectDragSource, isDragging, classes, ...props}) => (
	connectDragSource(
		<div className={classes.container}>
			<FunctionBlock {...props} className={isDragging ? classes.dragging : ''}/>
		</div>
	)
);

DraggableFunctionBlock.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	...FunctionBlock.propTypes,
};
DraggableFunctionBlock.defaultProps = {
	...FunctionBlock.defaultProps,
};

export default withStyles(styles)(DragSource(FUNCTION_TYPE, functionSource, collect)(DraggableFunctionBlock))
