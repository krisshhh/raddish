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
        return api.startTap(action.tabId).pipe(
            tap(e => console.log(e)),
            map(res => {
                if (res.type === 'start') { return tapStartEvent(res) }
                if (res.type === 'event') { return tapEvent(res) }
                if (res.type === 'stop') { return tapStopEvent(res) }
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
    ofType(START_TAP),
    mergeMap(action => {
        return api.stopTap(action.tabId).pipe(
            tap(e => console.log(e))
        );
    })
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
export function tapStopEvent({ tabId, event }) {
    return {
        type: TAP_STOP_EVENT,
        tabId,
        error: event
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
