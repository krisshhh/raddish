import { initialState } from './initialState';
import { remove, findIndex } from 'lodash';
import { 
    START_TAP,
    STOP_TAP,
    TAP_START_EVENT,
    TAP_STOP_EVENT,
    TAP_EVENT
} from './../actions/tap.actions';

export default function tapReducer(state = initialState.dashboard, action) {
    switch(action.type) {
        case START_TAP: 
            return startTap(state, action);
        default:
            return state;
    }
}

function startTap(state, { exchange, bindingKey, tabId }) {
    const newTabs = [ ...state.tabs ];
    const tabIndex = findIndex(state.tabs, { 'id': tabId })
    newTabs[tabIndex] = { ...newTabs[tabIndex], exchange, bindingKey, isTapping: true  };
    return {
        ...state,
        tabs: newTabs
    }; 
}