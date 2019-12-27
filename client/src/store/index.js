import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers/index'
import { loginEpic } from './../actions/login.actions'
import { startTapEpic } from './../actions/tap.actions';

const rootEpic = combineEpics(loginEpic, startTapEpic);
const epicMiddleware = createEpicMiddleware();
const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;