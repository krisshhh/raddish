export const NEW_TAB = 'NEW_TAB';
export function newTab() {
    return {
        type: NEW_TAB,
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

export const UPDATE_FORM_DETAILS = 'UPDATE_FORM_DETAILS';
export function updateFormDetails({ tabId, exchange, bindingKey }) {
    return {
        type: UPDATE_FORM_DETAILS,
        tabId,
        exchange, 
        bindingKey
    }
}