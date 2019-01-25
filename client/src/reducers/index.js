import { combineReducers } from 'redux';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAILURE, 
    LOGIN_REQUEST
} from './../actions';

const initialState = {
    loggedIn: false,
    loginDetails: {
        host: '127.0.0.1',
        port: '5672',
        userName: 'guest',
        password: 'guest'
    },
    rabbitmq: {},
    isLoggingIn: false
}

function radish(state = initialState, action) {
    switch(action.type) {
        case LOGIN_FAILURE:
            return { 
                ...state,
                loggedIn: false,
                loginDetails: action.loginDetails,
                isLoggingIn: false 
            };
        case LOGIN_SUCCESS:
            return { 
                ...state,
                loggedIn: true, 
                loginDetails: action.loginDetails, 
                isLoggingIn: false,
                rabbitmq: action.rabbitmq 
            };
        case LOGIN_REQUEST:
            return { 
                ...state,
                isLoggingIn: true, 
                loginDetails: action.loginDetails
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({ radish })

export default rootReducer;