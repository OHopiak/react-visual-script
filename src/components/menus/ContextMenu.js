import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import MenuItem from "./MenuItem";
import MenuList from "./MenuList";

const styles = () => ({
	root: {
		position: 'absolute',
		top: ({y}) => y,
		left: ({x}) => x,
		minHeight: 30,
		minWidth: 200,
		zIndex: 100,
		display: ({show}) => (show ? 'flex' : 'none'),
		flexDirection: 'column',
		color: 'white',
		backgroundColor: 'rgba(49, 49, 49, 0.95)',
		border: {
			color: 'white',
			style: 'solid',
			width: 2,
			radius: 10,
		},
	},
	title: {
		fontSize: '1.2em',
		paddingTop: 5,
		borderRadius: '10px 10px 0 0',
		backgroundColor: 'rgba(0, 0, 0, 0.45)',
		width: '100%',
	},
});

const ContextMenu = ({classes, title, options, handleChoice}) => (
	<div className={classes.root}>
		<div className={classes.title}>{title}</div>
		{options && options.map((option, i) => option.children ? (
			<MenuList key={i} handleChoice={handleChoice} option={option}/>
		) : (
			<MenuItem key={i} handleChoice={handleChoice} option={option}/>
		))}
	</div>
);

ContextMenu.propTypes = {
	show: PropTypes.bool,
	x: PropTypes.number,
	y: PropTypes.number,
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	handleChoice: PropTypes.func,
};
ContextMenu.defaultProps = {
	show: false,
	x: 0,
	y: 0,
	title: 'Actions',
	options: [],
};

export default withStyles(styles)(ContextMenu);
