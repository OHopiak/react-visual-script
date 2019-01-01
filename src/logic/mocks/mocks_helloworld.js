import {normalize} from "../../utils";
import {VSEvent, VSFunction} from "../nodes";

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
		name: 'generateHelloWorld',
		type: 'getter',
		returnValues: [
			{
				name: 'text',
				type: 'string'
			}
		],
		func: () => ({
			text: "Hello World!",
		}),
	}),
	new VSFunction({
		name: 'generateHelloOrest',
		type: 'getter',
		returnValues: [
			{
				name: 'text',
				type: 'string'
			}
		],
		func: () => ({
			text: "Hello Orest!",
		}),
	}),
], 'name');

const mockEvents = normalize([
	new VSEvent({
		name: 'process start',
	}),
], 'name');

const mockNodeInfo = [
	mockEvents['process start'].getInstance({
		x: 610,
		y: 440,
		// exec: 3,
	}),
	mockFunctions['generateHelloWorld'].getInstance({
		x: 610,
		y: 550,
	}),
	mockFunctions['console.log'].getInstance({
		x: 930,
		y: 440,
		connections: [
			{
				from: 2,
				fromValue: 0,
				toValue: 0,
			},
		],
	}),
	mockFunctions['generateHelloOrest'].getInstance({
		x: 610,
		y: 680,
	}),
];

export {
	mockNodeInfo,
	mockFunctions,
	mockEvents,
}
