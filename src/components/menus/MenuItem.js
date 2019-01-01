import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'

const styles = () => ({
	item: {
		fontSize: '0.9em',
		transition: 'background-color 0.4s ease',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.29)',
		},
		textAlign: 'left',
		paddingLeft: 12,
		paddingRight: 12,
	},
});

const MenuItem = ({classes, option, handleChoice}) => (
	<div className={classes.item} onClick={handleChoice(option)}>{option && option.title}</div>
);
MenuItem.propTypes = {
	classes: PropTypes.object.isRequired,
	option: PropTypes.object,
	handleChoice: PropTypes.func,
};

export default withStyles(styles)(MenuItem);
