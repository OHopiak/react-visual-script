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
		zIndex: 1,
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

class FunctionBlock extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['getter', 'transform', 'executable']).isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		parameters: PropTypes.arrayOf(PropTypes.object),
		returnValues: PropTypes.arrayOf(PropTypes.object)
	};

	render() {
		const {classes, x, y, name, type, parameters, sidesRef, returnValues} = this.props;
		return (
			<div className={classes.root} style={{top: y, left: x}}>
				<div className={classes.header}>(f) {name}</div>
				<div className={classes.body}>
					<div className={cx(classes.column, classes.left)} ref={sidesRef.left}>
						{type === "executable" && <Endpoint on type='execution'/>}
						{parameters && parameters.map(({name, type, on}) =>
							<Parameter key={name} {...{name, type, on}}/>)}
					</div>
					<div className={cx(classes.column, classes.right)} ref={sidesRef.right}>
						{type === "executable" && <Endpoint type='execution'/>}
						{returnValues && returnValues.map(({name, type, on}) =>
							<Parameter key={name} {...{name, type, on}} returnValue/>)}
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(FunctionBlock);
