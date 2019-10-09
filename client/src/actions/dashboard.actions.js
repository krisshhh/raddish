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

export const SET_TAP_DETAILS = 'SET_TAP_DETAILS';
export function setTapDetails({ exchange, bindingKey }) {
    return {
        type: SET_TAP_DETAILS,
        exchange, 
        bindingKey 
    }
}

export const CLOSE_TAB = 'CLOSE_TAB';
export function closeTab(id) {
    return {
        type: CLOSE_TAB,
        tabId: id
    }
}

// export const SET_MENU = 'SET_MENU'
// export function setActiveMenu(menuId) {
//     return {
//         type: SET_MENU,
//         menuId: menuId
//     }
// }

export const UPDATE_FORM_DETAILS = 'UPDATE_FORM_DETAILS';
export function updateFormDetails(data, tabId, menuId) {
    return {
        type: UPDATE_FORM_DETAILS,
        tabId,
        data, 
        menuId
    }
}