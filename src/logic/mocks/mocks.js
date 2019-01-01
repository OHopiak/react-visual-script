import {normalize} from "../../utils";
import {VSEvent, VSFunction} from "../nodes";
import VSOperation from "../nodes/VSOperation";

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
		name: 'one',
		type: "getter",
		returnValues: [
			{
				name: 'one',
				type: 'int',
			},
		],
		func: () => {
			return {one:1};
		},
	}),
	new VSFunction({
		name: 'two',
		type: "getter",
		returnValues: [
			{
				name: 'two',
				type: 'int',
			},
		],
		func: () => {
			return {two:2};
		},
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
	}),
	mockFunctions['one'].getInstance({
		x: 610,
		y: 510,
	}),
	mockFunctions['two'].getInstance({
		x: 610,
		y: 580,
	}),
	VSOperation.default.plus.getInstance({
		x: 830,
		y: 550,
		connections: [
			{
				from: 2,
				fromValue: 0,
				toValue: 0,
			},
			{
				from: 3,
				fromValue: 0,
				toValue: 1,
			},
		],
	})
];

export {
	mockNodeInfo,
	mockFunctions,
	mockEvents,
}
