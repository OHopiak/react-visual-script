import React from "react";
import withStyles from 'react-jss'
import cx from 'classnames'
import Connection from "./Connection";

const style = () => ({
	root: {
		height: '100%',
		width: '100%',
	}
});

const ConnectionManager = ({classes, className, data}) => (
	<div className={cx(classes.root, className)}>
		{data && data.map(item =>
			<Connection {...item} key={JSON.stringify(item)}/>)
		}
	</div>
);

export default withStyles(style)(ConnectionManager);
