import initialState from './initialState';
import dashboardReducer from './dashboard.reducer';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from './../actions/login.actions';

export default function loginReducer(state = initialState.login, action) {
    switch(action.type) {
        case LOGIN_FAILURE:
            return { 
                ...state,  
                status: false,
                details: action.loginDetails,
                processing: false 
            }
        case LOGIN_SUCCESS:
            return { 
                ...state,  
                status: true,
                details: action.loginDetails,
                processing: false 
            }
        case LOGIN_REQUEST:
            return { 
                ...state,  
                processing: true,
                details: action.loginDetails,
            }
        default:
            return state;
    }
}
