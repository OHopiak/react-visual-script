import {mockFuncInfo, mockFunctions} from "../../components/mocks";

// Types
const RVS_PREFIX = 'RVS:';
const RVS = Object.freeze({
	SELECT: RVS_PREFIX + 'SELECT',
	EDIT: RVS_PREFIX + 'EDIT',
});

// Actions
const selectFunction = (id) => ({
	type: RVS.SELECT,
	payload: {
		id,
	}
});

const editNode = (data) => ({
	type: RVS.EDIT,
	payload: {...data}
});

// Reducer
const initState = {
	functions: mockFunctions,
	functionInfo: mockFuncInfo,
	selected: 0,
};

const rvsReducer = (state = initState, action) => {
	switch (action.type) {
		case RVS.SELECT:
			return {...state, selected: action.payload.id};
		case RVS.EDIT:
			const newInfo = [...state.functionInfo];
			const i = newInfo.findIndex(el => (+el.id) === (+action.payload.id));
			if (i >= 0)
				newInfo[i] = action.payload;
			return {...state, functionInfo: newInfo};
		default:
			return state;
	}
};

// Export
export default rvsReducer;
export {
	selectFunction,
	editNode,
};
