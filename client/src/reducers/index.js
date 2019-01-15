import { combineReducers } from 'redux';
import { 
    RABBITMQ_LOGIN_FAILURE, 
    RABBITMQ_LOGIN_SUCCESS,
    RABBITMQ_LOGIN_REQUEST
} from './../actions';

const initialState = {
    loggedIn: false,
    loginDetails: {},
    rabbitmq: {},
    isLoggingIn: false
}

function radish(state = initialState, action) {
    switch(action.type) {
        case RABBITMQ_LOGIN_FAILURE:
            return { 
                ...state,
                loggedIn: false,
                loginDetails: action.loginDetails,
                isLoggingIn: false 
            };
        case RABBITMQ_LOGIN_SUCCESS:
            return { 
                ...state,
                loggedIn: true, 
                loginDetails: action.loginDetails, 
                isLoggingIn: false,
                rabbitmq: action.rabbitmq 
            };
        case RABBITMQ_LOGIN_REQUEST:
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