import React from 'react';
import logo from '../assets/logo.svg';
import withStyles from 'react-jss'
import ConnectedVSCanvas from "./ConnectedVSCanvas";

const styles = theme => ({
	root: {
		textAlign: 'center',
	},
	header: {
		backgroundColor: '#222',
		height: 150,
		padding: 20,
		color: 'white',
	},
	title: {
		fontSize: '1.5em',
	},
	'@keyframes spin': {
		from: {transform: 'rotate(0deg)'},
		to: {transform: 'rotate(360deg)'}
	},
	logo: {
		animation: 'spin infinite 20s linear',
		height: 80,
	},
	body: {
		display: 'flex',
		justifyContent: 'center',
		height: 500,
	},
});

const Layout = ({classes}) => (
	<div className={classes.root}>
		<header className={classes.header}>
			<img src={logo} className={classes.logo} alt="logo"/>
			<h1 className={classes.title}>Welcome to Visual Scripting Console</h1>
		</header>
		<div className={classes.body}>
			<ConnectedVSCanvas/>
		</div>
	</div>
);

export default withStyles(styles)(Layout);
