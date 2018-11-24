import React from "react";
import PropTypes from "prop-types";
import Endpoint from "./Endpoint";
import withStyles from 'react-jss'

const styles = () => ({
	root: {
		height: 20,
		display: 'flex',
		flexDirection: 'row',
	},
});
const Execution = ({classes, on}) => (
	<div className={classes.root}>
		<Endpoint type={'execution'} on={on}/>
	</div>
);
Execution.propTypes = {
	classes: PropTypes.object,
	on: PropTypes.bool,
};
Execution.defaultProps = {
	on: false
};

export default withStyles(styles)(Execution);
