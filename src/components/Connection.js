import cx from "classnames";
import React from "react";
import withStyles from "react-jss";

const style = theme => ({
	root: {
		position: 'absolute',
		zIndex: 1,
		top: ({y1, y2}) => Math.min(y1, y2),
		left: ({x1, x2}) => Math.min(x1, x2),
		height: ({y1, y2}) => Math.abs(y2 - y1) + theme.connections.weight,
		width: ({x1, x2}) => Math.abs(x2 - x1) + theme.connections.weight,
	},
	connection: {
		strokeWidth: theme.connections.weight,
		fillOpacity: 0,
	}
});

const Connection = ({theme, classes, x1, y1, x2, y2, type}) => {
	const w = theme.connections.weight / 2;
	const fromX = x1 <= x2 ? w : x1 - x2 - w;
	const fromY = y1 <= y2 ? w : y1 - y2 - w;
	const toX = x1 <= x2 ? x2 - x1 + w : w;
	const toY = y1 <= y2 ? y2 - y1 + w : w;
	const bez1X = (fromX + 2*toX)/3;
	const bez2X = (2*fromX + toX)/3;
	const from = `${fromX} ${fromY}`;
	const bez1 = `${bez1X} ${fromY}`;
	const bez2 = `${bez2X} ${toY}`;
	const to = `${toX} ${toY}`;
	return (
		<svg className={classes.root}>
			<path className={cx(classes.connection, type)}
				  d={`M ${from} C ${bez1} ${bez2} ${to}`}/>
		</svg>
	)
};

export default withStyles(style)(Connection);
