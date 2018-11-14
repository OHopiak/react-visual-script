import React from "react";
import cx from 'classnames'
import withStyles from 'react-jss'

const style = () => ({
	connection: {
		position: 'absolute',
		zIndex: 1,
		strokeWidth: 2,
	}
});
const Connection = ({className, x1, y1, x2, y2, type}) => (
	<path className={cx(className, type)} d={`M ${x1} ${y1} L ${x2} ${y2}`}/>
);

const ConnectionManager = ({classes, height, width, blocks}) => {
	console.log(Object.values(blocks).map(block => {
		if (block.connections)
			return block.connections.map(conn => ({...conn, from: block.id}));
		else
			return null
	}).flat().filter(x => x));
	return (
		<svg height={height} width={width}>
			<Connection className={classes.connection} x1={245} y1={80} x2={285} y2={80} type='object'/>
		</svg>
	);
};

export default withStyles(style)(ConnectionManager);
