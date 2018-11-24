import shadows from './shadows'

const defaultTypes = {
	int: 'dodgerblue',
	float: 'green',
	string: 'pink',
	object: '#00e1b6',
	array: '#ffaa00',
	execution: 'white',
};

const defaultConnections = {
	weight: 2,
	circleRadius: 6,
	circleMargin: 2,
};
const createTheme = (theme = {}) => {
	const types = {...defaultTypes, ...(theme.palette && theme.palette.types)};
	const palette = {...theme.palette, types};
	const connections = {...defaultConnections, ...theme.connections};
	return {
		...theme,
		palette,
		shadows,
		connections
	};
};

export default createTheme;
