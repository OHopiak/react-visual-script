import VSNode from "./VSNode";
import {EVENT} from "./types";

class VSEvent extends VSNode {
	constructor({name, returnValues}) {
		super({name, nodeType: EVENT});
		this.returnValues = returnValues;
	}

	getInstance = (config) => {
		return {...this.getBaseInstance(), ...config}
	};
}

export default VSEvent
