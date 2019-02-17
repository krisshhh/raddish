import { initialState } from './initialState';
import { LOGIN_SUCCESS } from './../actions/login.actions';
import { NEW_TAB, SET_ACTIVE_TAB, CLOSE_TAB } from './../actions/dashboard.actions';
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
                tabs: [...state.tabs, action.tab]
            }
        case SET_ACTIVE_TAB: 
            return {
                ...state,
                activeTab: action.tabIndex
            }
        case CLOSE_TAB: 
            return closeTabReducer(state, action);           
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
    const tabs = state.tabs;
    const activeIndex = state.activeTab;
    const activeTabId = state.tabs[activeIndex].id;
    const deleteTabIndex = findIndex(state.tabs, { 'id': action.tabId })
    const newTabs = remove([ ...state.tabs ], n => n.id !== action.tabId)
    const nearestTabId = (activeIndex === newTabs.length)? activeIndex - 1 : activeIndex; 
    const newActiveIndex = (activeIndex ===  deleteTabIndex)?
        nearestTabId : findIndex(newTabs, { 'id': activeTabId });
    return {
        ...state,
        tabs: newTabs,
        activeTab: nearestTabId
    }
}