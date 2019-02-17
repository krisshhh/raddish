import api from './../services/api';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import uuid from 'uuid';
import { catchError, tap, mergeMap, map } from 'rxjs/operators';

export const NEW_TAB = 'NEW_TAB';
export function newTab() {
    return {
        type: NEW_TAB,
        tab: {
            id: uuid.v4()
        }
    }
}

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export function setActiveTab(index) {
    return {
        type: SET_ACTIVE_TAB,
        tabIndex: index
    }
}

export const CLOSE_TAB = 'CLOSE_TAB';
export function closeTab(id) {
    return {
        type: CLOSE_TAB,
        tabId: id
    }
}

export const SET_MENU = 'SET_MENU'
export function setActiveMenu(menuId) {
    return {
        type: SET_MENU,
        menuId: menuId
    }
}