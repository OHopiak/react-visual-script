const mockFuncInfo = [
	{
		id: '1',
		name: "createUser",
		x: 10,
		y: 10,
		connections: [
			{
				to: '2',
				fromValue: 0,
				toValue: 0,
			}
		]
	},
	{
		id: '2',
		name: "print",
		x: 270,
		y: 10,
	}
];

const normalize = (arr, param = 'id') => arr.reduce((acc, cur) => {
	acc[cur[param]] = cur;
	return acc;
}, {});

const normalMockFuncInfo = normalize(mockFuncInfo);

const functions = {
	print: {
		name: 'print',
		type: "executable",
		parameters: [
			{
				name: 'user',
				type: 'object',
				on: true,
			}
		],
	},
	createUser: {
		name: 'createUser',
		type: "executable",
		parameters: [
			{
				name: 'username',
				type: 'string',
			},
			{
				name: 'id',
				type: 'int',
			},
			{
				name: 'mark',
				type: 'float',
			},
		],
		returnValues: [
			{
				name: 'user',
				type: 'object',
				on: true,
			},
			{
				name: 'subjects',
				type: 'array',
			},
		]

	}
};

export {
	mockFuncInfo,
	normalMockFuncInfo,
	functions,
}
