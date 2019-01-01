class VSNode {
	static lastId = 0;

	constructor({name, nodeType}) {
		this.name = name;
		this.nodeType = nodeType;
	}

	getBaseInstance = () => {
		VSNode.lastId += 1;
		return {
			id: VSNode.lastId,
			name: this.name,
			nodeType: this.nodeType,
		}
	};

	getInstance = () => {
		return this.getBaseInstance();
	};
}
export default VSNode;
