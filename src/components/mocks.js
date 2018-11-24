import {normalize} from "../utils";
import {VSFunction} from "../logic/functions";

const mockFunctions = normalize([
	new VSFunction({
		name: 'consoleLog',
		type: "executable",
		parameters: [
			{
				name: 'str',
				type: 'string',
			},
		],
		func: ({str}) => {
			console.log(str);
			return {};
		},
	}),
	new VSFunction({
		name: 'createUser',
		type: "executable",
		parameters: [
			{
				name: 'username',
				type: 'string',
			},
			{
				name: 'fullName',
				type: 'object',
			},
		],
		returnValues: [
			{
				name: 'user',
				type: 'object',
			},
		],
		func: ({username, fullName}) => ({
			user: {username, fullName}
		}),
	}),
	new VSFunction({
		name: 'object.toString',
		type: 'transform',
		parameters: [
			{
				name: 'obj',
				type: 'object',
			}
		],
		returnValues: [
			{
				name: 'str',
				type: 'string'
			}
		],
		func: ({obj}) => ({
			str: JSON.stringify(obj, null, "  ")
		}),
	}),
	new VSFunction({
		name: 'generateUsername',
		type: 'getter',
		returnValues: [
			{
				name: 'username',
				type: 'string'
			}
		],
		func: () => ({
			username: "johnny_smith"
		}),
	}),
	new VSFunction({
		name: 'generateFullName',
		type: 'getter',
		returnValues: [
			{
				name: 'fullName',
				type: 'object'
			}
		],
		func: () => ({
			fullName: {
				firstName: 'John',
				lastName: 'Smith',
			}
		}),
	}),
], 'name');

const mockFuncInfo = [
	mockFunctions['generateUsername'].getInstance({
		x: 10,
		y: 150,
	}),
	mockFunctions['generateFullName'].getInstance({
		x: 10,
		y: 220,
	}),
	mockFunctions['createUser'].getInstance({
		x: 220,
		y: 40,
		connections: [
			{
				from: 1,
				fromValue: 0,
				toValue: 0,
			},
			{
				from: 2,
				fromValue: 0,
				toValue: 1,
			},
		],
		exec: 4,
	}),
	mockFunctions['consoleLog'].getInstance({
		x: 630,
		y: 40,
		connections: [
			{
				// from: 1,
				from: 5,
				fromValue: 0,
				toValue: 0,
			},
		],
		exec: 6,
	}),
	mockFunctions['object.toString'].getInstance({
		x: 430,
		y: 140,
		connections: [
			{
				from: 3,
				fromValue: 0,
				toValue: 0,
			},
		],
	}),
	mockFunctions['console.log'].getInstance({
		x: 430,
		y: 240,
		connections: [
			{
				from: 1,
				fromValue: 0,
				toValue: 0,
			},
		],
	}),
];

export {
	mockFuncInfo,
	mockFunctions,
}
