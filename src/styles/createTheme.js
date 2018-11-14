import shadows from './shadows'

const types = {
	int: 'dodgerblue',
	float: 'green',
	string: 'pink',
	object: '#00e1b6',
	array: '#ffaa00',
	execution: 'white',
};

const createTheme = theme => {
	const palette = {...theme.palette, types: {...types, ...theme.palette.types}};
	const result = {...theme, palette, shadows};
	console.log(result);
	return result;
};

export default createTheme;
