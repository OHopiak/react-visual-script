import {normalize} from "../utils";
import {VSEvent, VSFunction} from "../logic/functions";

const mockFunctions = normalize([
	new VSFunction({
		name: 'console.log',
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
		name: 'user.create',
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

const mockEvents = normalize([
	new VSEvent({
		name: 'process start',
	}),
], 'name');

const mockNodeInfo = [
	mockFunctions['generateUsername'].getInstance({
		x: 610,
		y: 550,
	}),
	mockFunctions['generateFullName'].getInstance({
		x: 610,
		y: 620,
	}),
	mockFunctions['user.create'].getInstance({
		x: 820,
		y: 440,
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
	mockFunctions['console.log'].getInstance({
		x: 1230,
		y: 440,
		connections: [
			{
				from: 5,
				fromValue: 0,
				toValue: 0,
			},
		],
	}),
	mockFunctions['object.toString'].getInstance({
		x: 1030,
		y: 540,
		connections: [
			{
				from: 3,
				fromValue: 0,
				toValue: 0,
			},
		],
	}),
	mockEvents['process start'].getInstance({
		x: 610,
		y: 440,
		exec: 3,
	}),
];

export {
	mockNodeInfo,
	mockFunctions,
	mockEvents,
}
