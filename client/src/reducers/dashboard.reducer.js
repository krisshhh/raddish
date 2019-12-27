import { remove, findIndex } from 'lodash';
import { initialState, newTabState } from './initialState';
import { LOGIN_SUCCESS } from './../actions/login.actions';
import { 
    NEW_TAB,
    SET_ACTIVE_TAB, 
    CLOSE_TAB, 
    UPDATE_FORM_DETAILS 
} from './../actions/dashboard.actions';

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

function updateFormDetails(state, { tabId, exchange, bindingKey }) {
    const newTabs = [ ...state.tabs ];
    const tabIndex = findIndex(state.tabs, { 'id': tabId })
    newTabs[tabIndex] = { ...newTabs[tabIndex], exchange, bindingKey  };
    return {
        ...state,
        tabs: newTabs
    }; 
}