import withStyles from 'react-jss'
const createType = (color) => {
	return {
		stroke: color,
		fill: color,
	}
};

const styles = theme => {
	const types = {};
	Object.entries(theme.palette.types).forEach(([type, color]) =>
		types['.' + type] = createType(color));

	return ({
		'@global': {
			...types,
			'body': {
				margin: 0,
				padding: 0,
				fontFamily: 'sans-serif',
			}
		}
	})
};

const CSSBaseline = withStyles(styles)(() => '');
export default CSSBaseline;
