import { createStore, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers/index'
import { loginEpic } from './../actions/index'

const rootEpic = combineEpics(loginEpic);
const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;