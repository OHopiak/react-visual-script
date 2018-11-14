import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'
import Parameter from "./endpoints/Parameter";
import Endpoint from "./endpoints/Endpoint";

const styles = theme => ({
	root: {
		boxShadow: theme.shadows[8],
		textAlign: 'left',
		borderRadius: 10,
		width: 250,
		display: 'flex',
		flexFlow: 'column',
		zIndex: -1,
		position: 'absolute',
	},
	header: {
		textAlign: 'center',
		borderRadius: '10px 10px 0 0',
		height: 30,
		flex: '0 1 auto',
		background: 'rgba(148, 208, 248, 0.8)',
	},
	body: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		borderRadius: '0 0 10px 10px',
		height: '100%',
		background: 'rgba(49, 49, 49)',
		color: 'white',
	},
	column: {
		padding: 5,
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		width: '50%',
	},
	left: {
		alignItems: 'flex-start',
	},
	right: {
		alignItems: 'flex-end',
	}
});
const FunctionBlock = ({classes, className = 'func-block', x, y, name, type, parameters, returnValues}) => (
	<div className={cx(classes.root)} style={{top: y, left: x}}>
		<div className={cx(classes.header, className + '-header')}>(f) {name}</div>
		<div className={cx(classes.body, className + '-body')}>
			<div className={cx(classes.column, classes.left)}>
				{type === "executable" && <Endpoint on type='execution'/>}
				{parameters && parameters.map(({name, type, on}) => <Parameter key={name} {...{name, type, on}}/>)}
			</div>
			<div className={cx(classes.column, classes.right)}>
				{type === "executable" && <Endpoint type='execution'/>}
				{returnValues && returnValues.map(({name, type, on}) => <Parameter key={name} {...{name, type, on}}
																				   returnValue/>)}
			</div>
		</div>
	</div>
);
FunctionBlock.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['getter', 'transform', 'executable']),
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	parameters: PropTypes.arrayOf(PropTypes.object),
	returnValues: PropTypes.arrayOf(PropTypes.object)
};
FunctionBlock.defaultProps = {};

export default withStyles(styles)(FunctionBlock);
