import api from './../services/api';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, tap, mergeMap, map } from 'rxjs/operators';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function login(loginDetails) {
    return {
        type: LOGIN_REQUEST,
        loginDetails
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(loginDetails, data) {
    return {
        type: LOGIN_SUCCESS,
        loginDetails,
        rabbitmq: data,
        receivedAt: Date.now()
    }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export function loginFailure(loginDetails) {
    return {
        type: LOGIN_FAILURE,
        loginDetails
    }
}

// epic
export const loginEpic = action$ => action$.pipe(
    ofType(LOGIN_REQUEST),
    mergeMap(action => {
        return api.login(action.loginDetails).pipe(
            tap(e => console.log(e)),
            map(res => loginSuccess(action.loginDetails, res)),
            catchError(err => of({
                type: LOGIN_FAILURE,
                loginDetails: action.loginDetails
            }))
        );
    })
);