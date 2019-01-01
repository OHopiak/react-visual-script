import VSNode from "./VSNode";
import {OPERATION} from "./types";

class VSOperation extends VSNode {
	constructor({name, parameters, returnValues, func}) {
		super({name, nodeType: OPERATION});
		this.parameters = parameters;
		this.returnValues = returnValues;
		this.func = func;
	}

	getInstance = (config) => {
		return {...this.getBaseInstance(), ...config}
	};
}

VSOperation.default =  {
	plus: new VSOperation({
		name: 'plus',
		parameters: [
			{
				name: 'one',
				type: 'int',
			},
			{
				name: 'two',
				type: 'int',
			},
		],
		returnValues: [
			{
				name: 'result',
				type: 'int',
			},
		],
		func: ({one, two}) => ({result: +one + two}),
	})
};

export default VSOperation
