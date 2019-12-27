import api from './../services/api';
import { ofType } from 'redux-observable';
import { tap, mergeMap, map } from 'rxjs/operators';


export const START_TAP = 'START_TAP';
export function startTap({ exchange, bindingKey, tabId }) {
    return {
        type: START_TAP,
        tabId,
        exchange, 
        bindingKey 
    }
}
// epic
export const startTapEpic = action$ => action$.pipe(
    ofType(START_TAP),
    mergeMap(action => {
        return api.tap(action.tabId).pipe(
            map(res => {
                if (res.status === 'START') { return tapStartEvent(res) }
                if (res.status === 'EVENT') { return tapEvent(res) }
                if (res.status === 'STOP') { return tapStopEvent({ tabId: action.tabId }) }
            })
        );
    })
);


export const STOP_TAP = 'STOP_TAP';
export function stopTap({ tabId, error }) {
    return {
        type: STOP_TAP,
        tabId,
        error
    }
}
// epic
export const stopTapEpic = action$ => action$.pipe(
    ofType(STOP_TAP),
    mergeMap(action => api.stopTap(action.tabId))
);


export const TAP_START_EVENT = 'TAP_START_EVENT';
export function tapStartEvent({ tabId, event }) {
    return {
        type: TAP_START_EVENT,
        tabId,
        event
    }
}

export const TAP_STOP_EVENT = 'TAP_STOP_EVENT';
export function tapStopEvent({ tabId }) {
    return {
        type: TAP_STOP_EVENT,
        tabId,
        error: {}
    }
}

export const TAP_EVENT = 'TAP_EVENT';
export function tapEvent({ tabId, event }) {
    return {
        type: TAP_EVENT,
        tabId,
        event
    }
}
