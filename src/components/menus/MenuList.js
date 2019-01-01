import React from 'react';
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import MenuItem from "./MenuItem";
import cx from 'classnames'

const styles = theme => ({
	item: {
		transition: 'background-color 0.4s ease',
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.34)',
		},
		textAlign: 'left',
		paddingLeft: 12
	},
	submenu: {
		// overflow: 'hidden',
		// height: 'auto',
		paddingLeft: 12
	},
	collapsed: {
		// height: 0,
		display: 'none',
	}
});

class MenuList extends React.PureComponent {
	state = {collapsed: true};

	toggleCollapse = e => {
		e.stopPropagation();
		this.setState(state => ({collapsed: !state.collapsed}));
	};

	render() {
		const {classes, option = {}, handleChoice} = this.props;
		const {collapsed} = this.state;
		return (
			<>
				<div className={classes.item} onClickCapture={this.toggleCollapse}>* {option.title} *</div>
				<div className={cx(classes.submenu, collapsed && classes.collapsed)}>
					{option.children && option.children.map(option => (
						<MenuItem key={option.title} option={option} handleChoice={handleChoice}/>
					))}
				</div>
			</>
		)
	}
}

MenuList.propTypes = {
	classes: PropTypes.object.isRequired,
	option: PropTypes.object,
	handleChoice: PropTypes.func,
};

export default withStyles(styles)(MenuList);
