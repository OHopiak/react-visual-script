import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import withStyles from 'react-jss'
import Parameter from "./endpoints/Parameter";
import Execution from "./endpoints/Execution";

const styles = theme => ({
	root: {
		boxShadow: theme.shadows[8],
		textAlign: 'left',
		borderRadius: 10,
		width: 200,
		display: 'flex',
		flexFlow: 'column',
		zIndex: 1,
		position: 'absolute',
	},
	header: {
		textAlign: 'center',
		borderRadius: '10px 10px 0 0',
		height: 32,
		fontSize: '0.9rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '0 1 auto',
		background: 'rgba(148, 208, 248, 0.95)',
	},
	body: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		borderRadius: '0 0 10px 10px',
		height: '100%',
		background: 'rgba(49, 49, 49, 0.95)',
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
		returnValues: PropTypes.arrayOf(PropTypes.object),
		active: PropTypes.shape({
			params: PropTypes.arrayOf(PropTypes.number).isRequired,
			returns: PropTypes.arrayOf(PropTypes.number).isRequired,
			exec: PropTypes.shape({
				from: PropTypes.bool,
				to: PropTypes.bool,
			}),
		}).isRequired
	};

	render() {
		const {classes, x, y, name, type, parameters, sidesRef, returnValues, active, onClick} = this.props;
		const executable = type === "executable";
		let prefix = '';
		switch (type) {
			case 'executable':
				prefix = '(f)';
				break;
			case 'transform':
				prefix = '(t)';
				break;
			case 'getter':
				prefix = '(g)';
				break;
			default:
				prefix = '(?)';
				break;
		}
		return (
			<div className={classes.root} style={{top: y, left: x}} onClick={onClick}>
				<div className={classes.header}><span>{prefix} {name}</span></div>
				<div className={classes.body}>
					<div className={cx(classes.column, classes.left)} ref={sidesRef.left}>
						{executable && <Execution on={active.exec && active.exec.from}/>}
						{parameters && parameters.map(({name, type}, i) =>
							<Parameter key={name} {...{name, type}} on={active.params.includes(i)}/>)}
					</div>
					<div className={cx(classes.column, classes.right)} ref={sidesRef.right}>
						{executable && <Execution on={active.exec && active.exec.to}/>}
						{returnValues && returnValues.map(({name, type, on}, i) =>
							<Parameter key={name} {...{name, type}} on={active.returns.includes(i)} returnValue/>)}
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(FunctionBlock);
