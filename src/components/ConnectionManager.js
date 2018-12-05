import React from "react";
import withStyles from 'react-jss'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Connection from "./Connection";

const style = () => ({
	root: {
		height: '100%',
		width: '100%',
	}
});

const ConnectionManager = ({classes, className, connections}) => (
	<div className={cx(classes.root, className)}>
		{connections && connections.map(item =>
			<Connection {...item} key={JSON.stringify(item)}/>)
		}
	</div>
);
ConnectionManager.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	connections: PropTypes.array,
};

export default withStyles(style)(ConnectionManager);
