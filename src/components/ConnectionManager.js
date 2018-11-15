import React from "react";
import cx from 'classnames'
import withStyles from 'react-jss'

const style = () => ({
	connWrapper: {
		position: 'absolute',
		zIndex: 2,
	},
	connection: {
		strokeWidth: 4,
	}
});

const SVGConnection = ({className, x1, y1, x2, y2, type}) => (
	<path className={cx(className, type)} d={`M ${x1} ${y1} L ${x2} ${y2}`}/>
);

const SVGConnectionManager = ({classes, height, width, data}) => {
	return (
		<svg height={height} width={width}>
			{data && data.map(item =>
				<SVGConnection className={classes.connection}
							{...item} key={JSON.stringify(item)}/>)
			}
		</svg>
	);
};

const DivConnection = ({classes, x1, y1, x2, y2, type}) => (
	<svg height={y2-y1+2} width={x2-x1+2} className={classes.connWrapper} style={{top: y1, left: x1}}>
		<path className={cx(classes.connection, type)} d={`M ${0} ${0} L ${x2-x1} ${y2-y1}`}/>
	</svg>
		);
const DivConnectionManager = ({classes, height, width, data}) => (
	<div style={{height, width}}>
		{data && data.map(item =>
			<DivConnection classes={classes}
						{...item} key={JSON.stringify(item)}/>)
		}
	</div>
);

export default withStyles(style)(DivConnectionManager);
