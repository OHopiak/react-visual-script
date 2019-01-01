import VSNode from "./VSNode";
import {FUNCTION} from "./types";

class VSFunction extends VSNode {
	constructor({name, type, parameters, returnValues, func}) {
		super({name, nodeType: FUNCTION});
		this.type = type;
		this.parameters = parameters;
		this.returnValues = returnValues;
		this.func = func;
	}

	getInstance = (config) => {
		return {...this.getBaseInstance(), ...config};
	};

	getFuncPromise = (input) => new Promise(resolve => resolve(this.func(input)));
}

export default VSFunction
