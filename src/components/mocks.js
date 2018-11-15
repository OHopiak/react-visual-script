const mockFuncInfo = [
	{
		id: '1',
		name: "createUser",
		x: 10,
		y: 20,
		connections: [
			{
				to: '2',
				fromValue: 0,
				toValue: 0,
			},
			{
				to: '2',
				fromValue: 1,
				toValue: 1,
			},
		]
	},
	{
		id: '2',
		name: "print",
		x: 290,
		y: 20,
	}
];

const mockFunctions = {
	print: {
		name: 'print',
		type: "executable",
		parameters: [
			{
				name: 'user',
				type: 'object',
				on: true,
			},
			{
				name: 'subjects',
				type: 'array',
				on: true,
			},
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
				on: true,
			},
		]

	}
};

export {
	mockFuncInfo,
	mockFunctions,
}
