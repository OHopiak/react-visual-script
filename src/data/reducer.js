import {combineReducers} from 'redux';
import rvsReducer from './modules/rvs';

const appReducer = combineReducers({
	rvs: rvsReducer,
});

const reducer = (state, action) => appReducer(state, action);

export default reducer;
