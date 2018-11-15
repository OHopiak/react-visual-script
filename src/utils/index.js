const normalize = (arr, param = 'id') => arr.reduce((acc, cur) => {
	acc[cur[param]] = cur;
	return acc;
}, {});

export {
	normalize,
}
