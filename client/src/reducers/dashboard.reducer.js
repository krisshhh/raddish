import produce from "immer";
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
            return produce(state, draftState => {
                draftState.rabbitmq = action.rabbitmq;
            })

        case NEW_TAB: 
            return produce(state, draftState => {
                draftState.tabs.forEach(tab => { tab.isActive = false });
                draftState.tabs.push(newTabState({ isActive: true }));
            })

        case SET_ACTIVE_TAB: 
            return produce(state, draftState => {
                draftState.tabs.forEach((tab, index) => { 
                    tab.isActive = (index === action.tabIndex) 
                });
            })

        case CLOSE_TAB: 
            return produce(state, draftState => {
                const activeIndex = draftState.tabs.findIndex(tab => tab.id ===  action.tabId);
                draftState.tabs = remove([ ...draftState.tabs ], n => n.id !== action.tabId);
                const nearestTabIndex = (activeIndex === draftState.tabs.length)? activeIndex - 1 : activeIndex; 
                draftState.tabs.forEach((tab, index) => { 
                    tab.isActive = (index === nearestTabIndex) 
                });
            })
    
        case UPDATE_FORM_DETAILS:
            return updateFormDetails(state, action);
        default:
            return state;
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