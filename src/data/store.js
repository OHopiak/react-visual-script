import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';

let logger = () => next => next;

if (process.env.NODE_ENV === 'development') {
	const {createLogger} = require('redux-logger');
	logger = createLogger({
		collapsed: true,
	});
}

const middleware = applyMiddleware(
	logger,
);

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	middleware,
);
window.store = store;
export default store;
