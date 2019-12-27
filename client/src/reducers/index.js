import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import dashboardReducer from './dashboard.reducer';
import tapReducer from './tap.reducer';

const rootReducer = combineReducers({ 
    login: loginReducer, 
    dashboard: dashboardReducer, 
    tap: tapReducer 
});

export default rootReducer;