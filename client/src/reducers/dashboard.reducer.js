import { initialState, newTabState } from './initialState';
import { LOGIN_SUCCESS } from './../actions/login.actions';
import { NEW_TAB, SET_ACTIVE_TAB, SET_TAP_DETAILS, CLOSE_TAB, UPDATE_FORM_DETAILS, setTapDetails } from './../actions/dashboard.actions';
import { remove, findIndex } from 'lodash';

export default function dashboardReducer(state = initialState.dashboard, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return { 
                ...state,
                rabbitmq: action.rabbitmq 
            };
        case NEW_TAB: 
            return {
                ...state,
                tabs: [...state.tabs, newTabState()]
            }
        case SET_ACTIVE_TAB: 
            return {
                ...state,
                activeTab: action.tabIndex
            }
        case SET_TAP_DETAILS: 
            return updateTapDetails(state, action);
        case CLOSE_TAB: 
            return closeTabReducer(state, action);
        case UPDATE_FORM_DETAILS:
            return updateFormDetails(state, action);
        default:
            return state;
    }
}

/**
 * remove tab from tabs and change activeTab to closest tab
 * @param {*} state 
 * @param {*} action 
 */
function closeTabReducer(state, action) {
    const activeIndex = state.activeTab;
    const newTabs = remove([ ...state.tabs ], n => n.id !== action.tabId)
    const nearestTabId = (activeIndex === newTabs.length)? activeIndex - 1 : activeIndex; 
    return {
        ...state,
        tabs: newTabs,
        activeTab: nearestTabId
    }
}

function updateTapDetails(state, { exchange, bindingKey }) {
    const { activeTab } = state;
    state.tabs[activeTab].exchange = exchange;
    state.tabs[activeTab].bindingKey = bindingKey;
    return { ...state };
}

function updateFormDetails(state, { data, tabId, menuId }) {
    const newTabs = [ ...state.tabs ];
    const tabIndex = findIndex(state.tabs, { 'id': tabId })
    newTabs[tabIndex].menu[menuId] = { ...newTabs[tabIndex].menu[menuId], ...data  };
    return {
        ...state,
        tabs: newTabs
    }; 
}