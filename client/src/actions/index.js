import api from './../services/api';

export const RABBITMQ_LOGIN_REQUEST = 'RABBITMQ_LOGIN_REQUEST';
export function rabbitmqLoginRequest(loginDetails) {
    return {
        type: RABBITMQ_LOGIN_REQUEST,
        loginDetails
    }
}

export const RABBITMQ_LOGIN_SUCCESS = 'RABBITMQ_LOGIN_SUCCESS';
export function rabbitmqLoginSuccess(loginDetails, data) {
    return {
        type: RABBITMQ_LOGIN_SUCCESS,
        loginDetails,
        rabbitmq: data,
        receivedAt: Date.now()
    }
}

export const RABBITMQ_LOGIN_FAILURE = 'RABBITMQ_LOGIN_FAILURE'
export function rabbitmqLoginFailure(loginDetails) {
    return {
        type: RABBITMQ_LOGIN_FAILURE,
        loginDetails
    }
}

export function login(details) {
    return function(dispatch) {
        dispatch(rabbitmqLoginRequest(details));
        return api.login(details)
            .then(res => dispatch(rabbitmqLoginSuccess(details, res)))
            .catch(err => dispatch(rabbitmqLoginFailure(details)))
    }
}
